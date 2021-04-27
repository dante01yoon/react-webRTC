import styled from "styled-components";
import React, { FC } from "react";
import { nanoid } from "nanoid";
import type { Profile, RoomState } from "../stores/roomStore";

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.board_background};
  position: relative;
  width: 700px;
  border-radius: 8px;
  height: 498px;
  padding: 10px;
  margin-top: 10px;
  margin-right: 20px;
`;

const StyledVideoCard = styled.div<{
  isSpeaker?: boolean;
}>`
  display: inline-block;
  width:  160px;
  height: 160px;
  padding: 2px;
  border: 1px solid ${({ isSpeaker }) => isSpeaker ? "green" : "transparent"};
`;

interface VideoBoardProps {
  subscribers: RoomState["subscribers"];
}

const dummySubscribers = (): RoomState["subscribers"] => {
  const reduced = new Array(10)
    .fill(0)
    .map(() => nanoid(5))
    .reduce((acc: { [key: string]: Profile }, curr) => {
      acc[curr] = {
        name: "testUser",
        uid: curr,
      }
      return acc;
    }, {});
  return reduced;
}

const VideoBoard: FC<VideoBoardProps> = ({
  subscribers,
}) => {
  const dummy = dummySubscribers();
  console.log("subscribers: ", subscribers);
  console.log("dummy: ", dummy);
  const renderVideos = () => {
    return Object.entries(subscribers).map(([uid, profile], index) => {
      if (profile) {
        const { videoTrack, audioTrack } = profile;
        return <StyledVideoCard
          key={uid}
          ref={el => {
            if (el && (videoTrack || audioTrack)) {
              videoTrack?.play(el);
              audioTrack?.play();
            }
          }} />
      }
    })
  }

  return (
    <StyledWrapper>
      {renderVideos()}
    </StyledWrapper>
  )
}

export default VideoBoard;