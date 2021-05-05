import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import firebase from "firebase/app";
import renderRoute from "./route";
import { Provider } from "react-redux";
import { rootStore } from "./stores";
import ThemeProvider from "./theme";
import {
  Layout
} from "./components";

function App() {
  useEffect(() => {
    // Your web app's Firebase configuration
    const firebaseConfig = Object.freeze({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    });
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
  }, []);
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
