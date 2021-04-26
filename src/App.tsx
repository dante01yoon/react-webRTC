import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import renderRoute from "./route";
import { Provider } from "react-redux";
import { rootStore } from "./stores";
import ThemeProvider from "./theme";
import {
  Layout
} from "./components";

function App() {
  return (
    <Provider store={rootStore}>
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Switch>
              {renderRoute()}
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
