import { configureStore } from "@reduxjs/toolkit";
import {
  sessionReducer
} from ".";

export interface WebStore {
  sessionStore: typeof sessionReducer;
}

export default configureStore({
  reducer: {
    sessionStore: sessionReducer,
  },
})
