import { createSlice, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { IRemoteAudioTrack, IRemoteVideoTrack, UID } from "agora-rtc-sdk-ng";

export interface Profile {
  name: string;
  uid: UID;
  videoTrack?: IRemoteVideoTrack;
  audioTrack?: IRemoteAudioTrack;
}

export interface Volume {
  level: number;
  uid: UID;
}

export interface RoomState {
  roomCode: Nullable<string>;
  roomName: Nullable<string>;
  subscribers: Record<UID, Nullable<Profile>>;
  loudest: Nullable<Volume>,
}

const initialState: RoomState = {
  roomCode: null,
  roomName: null,
  subscribers: {},
  loudest: null,
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
  setLoudest(state, { payload: { volume } }: {
    payload: {
      volume: Volume
    }
  }) {
    state.loudest = volume;
  }
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
  setLoudest,
} = roomSlice.actions;

export default roomSlice.reducer;