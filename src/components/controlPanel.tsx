import Reeact, { FC } from "react";
import styled, { css } from "styled-components";
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

}

const ControlPanel: FC = () => {

  return (
    <StyledWrapper>
      <StyledMuteMySelf />
      <StyledVideoMySelf />
    </StyledWrapper>
  )
}

export default ControlPanel;