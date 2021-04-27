import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  RoomState,
  SessionState
} from ".";
import sessionReducer from "../stores/sessionStore";
import roomReducer from "../stores/roomStore";

export interface WebStore {
  session: SessionState;
  room: RoomState;
}

const customMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  reducer: {
    session: sessionReducer,
    room: roomReducer,
  },
  middleware: customMiddleware,
})

export default store;