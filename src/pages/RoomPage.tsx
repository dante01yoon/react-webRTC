import React, { FC, useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStores from "../utils/useStores";
import { RouteComponentProps } from "react-router-dom";
import styled, { css } from "styled-components";
import { WebStore } from "../stores";
import { WrapperPage } from ".";
import { WebRoute } from "../route";
import {
  setRoomCode,
  setRoomName,
  setSubscribers,
  pushSubscribers,
  removeSubscribers,
  setLoudest,
  Volume
} from "../stores/roomStore"
import VideoBoard from "../components/videoboard";
import ChatBoard from "../components/chatboard";
import ControlPanel from "../components/controlPanel";
import { IAgoraRTCRemoteUser, UID } from "agora-rtc-sdk-ng";
import isNil from "lodash/isNil";

const StyledSection = styled.section`
`;

const StyledArticle = styled.article`
  display: inline-block;
  vertical-align: bottom;
`;


const StyledMainVideoView = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
`;

const profileCSS = css`
  display: inline-block;
  background-color: black;
  width: 300px;
  height: calc(250px * 0.75);
  border-radius: 8px;

  * {
    border-radius: 8px;
  }
`;

const StyledMyProfile = styled.div`
  ${profileCSS}
`;

const StyledCallerProfile = styled.div`
  ${profileCSS}
  background-color: transparent;
`;

const StyledSpeakerCard = styled.div<{
  isSpeaker?: boolean;
}>`
  width: 250px;
  height:250px;
  border: 1px solid ${({ isSpeaker }) => isSpeaker ? "green" : "black"};
`;

const StyledChatCardWrapper = styled.div`
  overflow-y: auto;
`;

interface RoomPageProps extends RouteComponentProps<{
  id: string;
}> {
  route: WebRoute;
};

const RoomPage: FC<RoomPageProps> = ({
  match,
  route,
}) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const { client } = useSelector((state: WebStore) => state.session);
  const state = useStores();
  const { session: { profile }, room: { subscribers, loudest } } = state;
  const [isMute, setMute] = useState(false);
  const myProfileRef = useRef<HTMLDivElement>(null);
  const callerProfileRef = useRef<HTMLDivElement>(null);
  const loudestRef = useRef(loudest);

  useEffect(() => {
    dispatch(setRoomCode(id));
  }, [id])

  useEffect(() => {
    loudestRef.current = loudest;
  }, [loudest]);

  const volumeIndicatorCallback = (volumes: Array<{
    level: number;
    uid: UID;
  }>) => {
    let highestVolume: Nullable<Volume> = loudest;

    volumes.forEach((volume, _) => {

      const { level, uid } = volume;
      console.log("level: ", level, "uid: ", uid);
      if (isNil(highestVolume)) {
        highestVolume = volume;
        dispatch(setLoudest({ volume: highestVolume }));
        return false;
      }
      if (highestVolume && highestVolume.level < level && highestVolume.uid !== uid) {
        highestVolume = volume;
      }
    })
    console.log("highestVolume.uid: ", highestVolume?.uid);
    console.log("loudestRef.current.uid: ", loudestRef.current?.uid);
    if (loudest && highestVolume?.uid !== loudestRef.current?.uid) {
      console.log("callerProfileRef.current:", callerProfileRef.current);
      dispatch(setLoudest({ volume: highestVolume }));
      if (Object.keys(subscribers).length > 0 && callerProfileRef.current) {
        console.log("before loudest play");
        console.log("subscribers[loudest.uid]?.videoTrack: ", subscribers[loudest.uid]?.videoTrack);
        callerProfileRef.current.innerHTML = "";
        console.log("loudest.uid: ", loudest.uid)
        subscribers[loudest.uid]?.videoTrack?.play(callerProfileRef.current);
      }
    }
  }

  useEffect(() => {
    console.log("subscribers: ", subscribers);
    console.log("loudest: ", loudest);
  }, [subscribers, loudest]);

  useEffect(() => {
    if (client) {
      client.join("test", process.env.REACT_APP_TOKEN!).then(async (uid) => {
        if (uid && profile) {
          dispatch(setSubscribers({ payload: subscribers[uid] = profile }))
        }
        await client.publicAudioLocalTrack();
        await client.publicVideoLocalTrack();

        // 오디오 볼륨 인디케이터 설정
        client.enableAudioVolumeIndicator(volumeIndicatorCallback)
        // 영상 실행 및 오디오 실행 
        client.rtc.localVideoTrack.play(myProfileRef.current)
        client.rtc.localAudioTrack.play();
        await client.publish({ mediaType: "video" });
      });

      return (() => {
        client.leaveCall();
      })
    }
  }, []);

  const subscribeHandler = (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
    if (user) {
      dispatch(pushSubscribers({
        user: {
          uid: user.uid,
          // 이름을 어디서 가지고 올까 
          name: "something",
          videoTrack: user.videoTrack,
          audioTrack: user.audioTrack,
        }
      }))
    }
  }

  const unSubscribeHandler = (user: IAgoraRTCRemoteUser) => {
    dispatch(removeSubscribers({
      uid: user.uid
    }))
  }

  useEffect(() => {
    if (client) {
      if (myProfileRef.current) {
        client.subscribe(subscribeHandler);
      }
      client.unSubscribe(unSubscribeHandler)
    }
  }, []);

  const handleRender = () => {
    return (
      <StyledSection>
        <StyledArticle>
          <StyledMainVideoView>
            <StyledMyProfile id="myProfile" ref={myProfileRef} />
            <ControlPanel client={client} />
            <StyledCallerProfile id="callerProfile" ref={callerProfileRef} />
          </StyledMainVideoView>
          <VideoBoard subscribers={subscribers} />
        </StyledArticle>
        <StyledArticle>
          <StyledChatCardWrapper>
            <ChatBoard />
          </StyledChatCardWrapper>
        </StyledArticle>
      </StyledSection>
    )
  }

  return <WrapperPage route={route} onRender={handleRender} />
}

export default RoomPage;