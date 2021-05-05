import React, { FC } from "react";
import styled from "styled-components";
import ChatBoard from "../components/chatboard";
import { WrapperPage } from "."
import { WebRoute } from "../route";
import { RouteComponentProps } from "react-router";

interface ChatPageProps extends RouteComponentProps {
  route: WebRoute
}

const ChatPage: FC<ChatPageProps> = ({ route }) => {

  const handleSubmit = () => {

  }

  const handleRender = () => {
    return (
      <>
        <ChatBoard onSubmit={handleSubmit} />
      </>
    )
  }
  return <WrapperPage onRender={handleRender} route={route} />
}

export default ChatPage;