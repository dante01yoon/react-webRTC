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
    <ThemeProvider>
      <Provider store={rootStore}>
        <Layout>
          <BrowserRouter>
            <Switch>
              {renderRoute()}
            </Switch>
          </BrowserRouter>
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
