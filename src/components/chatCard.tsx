import React, { FC, useEffect } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin-bottom: 10px;
`;

const StyledName = styled.div<{
  color: string;
}>`
  color: ${({ color }) => color};
  display: inline-block;
`;

const StyledChatMessageSeperator = styled.span`
  &::after {
    display: inline;
    content: ":";
    color: ${({ theme }) => theme.colors.white};
  }
`;

const StyledChatMessage = styled.span`
  color: ${({ theme }) => theme.colors.white};
  line-height: 21px;
  word-break: break-all;
  margin-left: 10px;
`;

interface ChatCardProps {
  name: string;
  color: string;
  message: string;
}

const ChatCard: FC<ChatCardProps> = ({ name, color, message }) => {

  return (
    <StyledWrapper>
      <StyledName color={color}>{name}</StyledName>
      <StyledChatMessageSeperator />
      <StyledChatMessage>{message}</StyledChatMessage>
    </StyledWrapper>
  )
}

export default ChatCard;