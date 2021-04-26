import React, { FC } from "react";
import { createGlobalStyle, ThemeProvider as GlobalThemeProvider } from "styled-components";
import reset from "styled-reset";
import { Colors, colors } from "./colors";

export interface Theme {
  colors: Colors;
}

const theme: Theme = Object.freeze({
  colors,
})

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  ${reset}
  
  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg_dark}
  }

  color: ${({ theme }) => theme.colors.primary_text};

`

const ThemeProvider: FC = ({ children }) => {
  return (
    <GlobalThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </GlobalThemeProvider>
  )
}

export default ThemeProvider;