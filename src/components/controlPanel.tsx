import React, { FC, useEffect } from "react";
import styled, { css } from "styled-components";
import { AgoraRTCClient } from "../utils/rtc";

import microphone from "../assets/images/microphone.svg";
import webcam from "../assets/images/webcam.svg";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const panelCSS = css`
  background-size: cover;
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
  margin: 20px 0;
  cursor: pointer;
`;

const StyledMuteMySelf = styled.div`
  ${panelCSS}
  background-image: url(${microphone});
`;

const StyledVideoMySelf = styled.div`
  ${panelCSS}
  background-image: url(${webcam});
`;

interface ControlPanelProps {
  client: AgoraRTCClient | null
}

const ControlPanel: FC<ControlPanelProps> = ({
  client,
}) => {
  const handleAudioToggle = async () => {
    try {
      if (client?.rtc.localAudioTrack) {
        if (client?.rtc.localAudioTrack.isPlaying) {
          client.rtc.localAudioTrack.setVolume(0);
          client.rtc.localAudioTrack.stop();
        }
        else {
          client.rtc.localAudioTrack.play();
          client.rtc.localAudioTrack.setVolume(100);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleVideoToggle = () => {
    if (client?.rtc.localVideoTrack) {
      const { localVideoTrack } = client.rtc;

      if (localVideoTrack.isPlaying) {
        localVideoTrack.stop();
      }
      else {
        localVideoTrack.play();
      }
    }
  }



  return (
    <StyledWrapper>
      <StyledMuteMySelf onClick={handleAudioToggle} />
      <StyledVideoMySelf onClick={handleVideoToggle} />
    </StyledWrapper>
  )
}

export default ControlPanel;