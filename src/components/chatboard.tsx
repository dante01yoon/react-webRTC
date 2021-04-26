import React, { FC } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.board_background};
  float: right;
  box-sizing: border-box;
  width: 300px;
  height: 750px;
  padding: 5px 25px;
  border-radius: 8px;
`;

const ChatBoard: FC = ({ }) => {

  return (
    <StyledWrapper>

    </StyledWrapper>
  )
}

export default ChatBoard;