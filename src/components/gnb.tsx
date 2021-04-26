import React, { FC } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SearchBox from "../components/search";
import ProfileMenu from "../components/profileMenu";

import logo from "../assets/images/logo.png";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 72px;
  padding: 10px 40px;
`;

const StyledIconBox = styled.div`
  background: url(${logo});
  background-size: cover;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  cursor: pointer;
`;

const Gnb: FC = ({

}) => {
  const history = useHistory();

  const goHome = () => {
    history.replace("/");
  }

  return (
    <StyledWrapper>
      <StyledIconBox onClick={goHome} />
      <SearchBox />
      <ProfileMenu />
    </StyledWrapper>
  )
}

export default Gnb;