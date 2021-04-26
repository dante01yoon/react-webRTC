import React, { FC } from "react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { WebRoute } from "../route";
import { WrapperPage } from ".";

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary_text};
  line-height: 16px;
  font-size: 16px;
`;

interface ErrorPageProps extends RouteComponentProps {
  status?: number | string;
  route: WebRoute;
}

const ErrorPage: FC<ErrorPageProps> = ({
  route,
  status = 404,
}) => {

  const handleRender = () => {
    return (
      <StyledTitle>{status}에러가 발생했습니다.</StyledTitle>
    )
  }

  return <WrapperPage route={route} onRender={handleRender} />
}

export default ErrorPage;