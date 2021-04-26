import rootStore, { WebStore } from "./configure";
import sessionReducer, { SessionState } from "./sessionStore";
import roomReducer, { RoomState } from "./roomStore";

export {
  rootStore,
  sessionReducer,
  roomReducer,
}

// type, interface
export type {
  WebStore,
  SessionState,
  RoomState,
}