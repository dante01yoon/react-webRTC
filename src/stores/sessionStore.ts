import { createSlice, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit";

interface SessionState {
  userCode: Nullable<string>;
  profile: Nullable<string>;
}

const initialState: SessionState = {
  userCode: null,
  profile: null,
}

const sessionReducers: ValidateSliceCaseReducers<SessionState, SliceCaseReducers<SessionState>> = {
  setUserCode: ({ userCode }, { payload: { userCode: payloadUserCode } }) => {
    userCode = payloadUserCode;
  }
}

export const sessionSlice = createSlice({
  name: "sessionStore",
  initialState,
  reducers: sessionReducers,
});

export const { setUserCode } = sessionSlice.actions;

export default sessionSlice.reducer;