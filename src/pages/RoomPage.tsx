import React, { FC, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStores from "../utils/useStores";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { WebStore } from "../stores";
import { WrapperPage } from ".";
import { WebRoute } from "../route";
import {
  setRoomCode,
  setRoomName,
  setSubscribers,
  pushSubscribers,
  removeSubscribers,
} from "../stores/roomStore"
import VideoBoard from "../components/videoboard";
import ChatBoard from "../components/chatboard";
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

const StyledSection = styled.section`
`;

const StyledArticle = styled.article`
  display: inline-block;
`;

const StyledMyProfile = styled.div`
  width: 300px;
  height: calc(250px * 0.75);

  * {
    border-radius: 8px;
  }
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
  const { session: { profile }, room: { subscribers } } = state;
  const myProfileRef = useRef<HTMLDivElement>(null);
  const speakersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    dispatch(setRoomCode(id));
  }, [id])

  useEffect(() => {
    if (client) {
      client.join("test", process.env.REACT_APP_TOKEN!).then(async (uid) => {
        if (uid && profile) {
          dispatch(setSubscribers({ payload: subscribers[uid] = profile }))
        }
        await client.publicAudioLocalTrack();
        await client.publicVideoLocalTrack();
        // 내 영상 실행
        client.rtc.localVideoTrack.play(myProfileRef.current)
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
      payload: {
        user: {
          uid: user.uid,
          // 이름을 어디서 가지고 올까 
          name: "something",
        }
      }
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

  console.log("subscribers: ", subscribers);

  const handleRender = () => {
    return (
      <StyledSection>
        <StyledArticle>
          <StyledMyProfile id="myProfile" ref={myProfileRef} />
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