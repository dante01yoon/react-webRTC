import React, { FC } from "react";
import { createGlobalStyle, ThemeProvider as GlobalThemeProvider } from "styled-components";
import reset from "styled-reset";
import { Colors, colors } from "./colors";

const GlobalStyles = createGlobalStyle`
  ${reset};
`

export interface Theme {
  colors: Colors;
}

const theme: Theme = Object.freeze({
  colors,
})

const ThemeProvider: FC = ({ children }) => {
  return (
    <GlobalThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </GlobalThemeProvider>
  )
}

export default ThemeProvider;