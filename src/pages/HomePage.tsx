import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import isNil from "lodash/isNil";
import WrapperPage from "./WrapperPage";
import { WebRoute } from "../route";

const StyledSection = styled.section`
  
`;

const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.colors.primary_text};
`;

const StyledFormWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const StyledField = styled.input`
  
`;

const StyledButton = styled.button`

`;

interface HomePageProps extends RouteComponentProps {
  route: WebRoute;
}

const HomePage: FC<HomePageProps> = ({ history, route }) => {
  const [idField, setIdField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [authState, setAuthState] = useState(() => localStorage.getItem("sampleAuth"));

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setIdField(e.target.value);
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordField(e.target.value);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const sampleToken = nanoid(20);
    localStorage.setItem("sampleAuth", sampleToken);
    setAuthState(sampleToken);

  }

  useEffect(() => {
    if (localStorage.getItem("sampleAuth")) {

      history.replace("/channel");
    }
  }, [authState]);

  const handleRender = () => {

    return (
      <StyledSection>
        <StyledFormWrapper>
          <StyledH1>로그인</StyledH1>
          <form onSubmit={handleSubmit}>
            <StyledField
              placeholder={"아이디"}
              value={idField}
              onChange={handleChangeId}
            />
            <StyledField
              placeholder={"비밀번호"}
              value={passwordField}
              onChange={handleChangePassword}
            />
            <StyledButton type="submit">접속</StyledButton>
          </form>
        </StyledFormWrapper>

      </StyledSection>
    )
  }

  return <WrapperPage onRender={handleRender} route={route} />
}

export default HomePage;
