import { createSlice, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { IRemoteAudioTrack, IRemoteVideoTrack, UID } from "agora-rtc-sdk-ng";

export interface Profile {
  name: string;
  uid: UID;
  videoTrack?: IRemoteVideoTrack;
  audioTrack?: IRemoteAudioTrack;
}

export interface RoomState {
  roomCode: Nullable<string>;
  roomName: Nullable<string>;
  subscribers: Record<UID, Nullable<Profile>>;
}

const initialState: RoomState = {
  roomCode: null,
  roomName: null,
  subscribers: {},
}

const roomReducers: ValidateSliceCaseReducers<RoomState, SliceCaseReducers<RoomState>> = {
  setRoomCode(state, { payload: { roomCode: payloadRoomCode } }) {
    state.roomCode = payloadRoomCode;
  },
  setRoomName(state, { payload: { roomName: payloadRoomName } }) {
    state.roomName = payloadRoomName;
  },
  setSubscribers(state, { payload: { subscribers: payloadSubscribers } }) {
    state.subscribers = payloadSubscribers;
  },
  pushSubscribers(state, { payload: { user: userPayload } }: { payload: { user: Profile } }) {
    state.subscribers[userPayload.uid] = userPayload;
  },
  removeSubscribers(state, { payload: { uid: uidPayload } }) {
    delete state.subscribers[uidPayload];
  },
}

export const roomSlice = createSlice({ 
  name: "room",
  initialState,
  reducers: roomReducers,
});

export const {
  setRoomCode,
  setRoomName,
  setSubscribers,
  pushSubscribers,
  removeSubscribers,
} = roomSlice.actions;

export default roomSlice.reducer;