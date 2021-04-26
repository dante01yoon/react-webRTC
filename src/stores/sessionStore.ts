import { createSlice, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import type { Profile } from "./roomStore";
import { AgoraRTCClient } from "../utils/rtc";

export interface SessionState {
  userCode: Nullable<string>;
  profile: Nullable<Profile>;
  join: Nullable<string>;
  uid: Nullable<string>;
  client: AgoraRTCClient | null;
}

const initialState: SessionState = {
  userCode: null,
  profile: null,
  join: null,
  uid: null,
  client: null,
}

const sessionReducers: ValidateSliceCaseReducers<SessionState, SliceCaseReducers<SessionState>> = {
  setUserCode: (state, { payload: { userCode: payloadUserCode } }) => {
    state.userCode = payloadUserCode;
  },
  setJoin: (state, { payload: { join: payloadJoin } }) => {
    state.join = payloadJoin;
  },
  setProfile: (state, { payload: { profile: payloadProfile } }) => {
    state.profile = {
      ...state.profile,
      ...payloadProfile
    };
  },
  setUid: (state, { payload: { uid: payloadUid } }) => {
    state.uid = payloadUid;
  },
  setClient: (state, { payload: { client: payloadRTC } }) => {
    state.client = payloadRTC;
  }
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: sessionReducers,
});

export const { setUserCode, setJoin, setUid, setClient } = sessionSlice.actions;

export default sessionSlice.reducer;