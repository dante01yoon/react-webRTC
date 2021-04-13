import React, { FC } from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  padding: 30px 15px 0;
`;

const Layout: FC = ({ children }) => {
  return (
    <StyledMain>
      {children}
    </StyledMain>
  )
}

export default Layout;