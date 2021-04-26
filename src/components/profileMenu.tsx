import React, { FC } from "react";
import styled from "styled-components";

import background from "../assets/images/background.png";

const StyledWrapper = styled.div`
  
`;

const StyledProfileImage = styled.div`
  background: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

const ProfileMenu: FC = ({ }) => {


  return (
    <StyledWrapper>
      <StyledProfileImage />
    </StyledWrapper>
  )
}

export default ProfileMenu;