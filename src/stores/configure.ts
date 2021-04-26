import { configureStore } from "@reduxjs/toolkit";
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

const store = configureStore({
  reducer: {
    session: sessionReducer,
    room: roomReducer,
  }
})

export default store;