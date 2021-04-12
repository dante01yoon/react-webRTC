import React from 'react';
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import renderRoute from "./route";
import { Provider } from "react-redux";
import { rootStore } from "./stores";

const theme = {}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={rootStore}>
        <BrowserRouter>
          {renderRoute()}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
