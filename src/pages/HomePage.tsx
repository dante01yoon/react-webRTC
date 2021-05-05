import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import firebase from "firebase";

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
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [authState, setAuthState] = useState(() => localStorage.getItem("sampleAuth"));

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailField(e.target.value);
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordField(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // handleSignIn(emailField, passwordField);
    const sampleToken = nanoid(20);
    localStorage.setItem("sampleAuth", sampleToken);
    setAuthState(sampleToken);
  }

  useEffect(() => {
    if (localStorage.getItem("sampleAuth")) {

      history.replace("/channel");
    }
  }, [authState]);

  const handleSignUp = (email: string, password: string) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        throw Error(errorMessage);
      })
  }

  const handleSignIn = (email: string, password: string) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        throw Error(errorMessage);
      })
  }

  const handleRender = () => {
    return (
      <StyledSection>
        <StyledFormWrapper>
          <StyledH1>로그인</StyledH1>
          <form onSubmit={handleSubmit}>
            <StyledField
              placeholder={"아이디"}
              value={emailField}
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
