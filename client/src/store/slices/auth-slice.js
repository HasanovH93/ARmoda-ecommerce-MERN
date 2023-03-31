import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userToken: null,
    userId: null,
    adminToken: null,
    adminId: null,
    expiresIn: null,
  },
  reducers: {
    setUserToken(state, action) {
      state.userToken = action.payload.token;
      state.expiresIn = action.payload.expiresIn;
    },
    setAdminToken(state, action) {
      state.adminToken = action.payload.token;
      state.adminId = action.payload.userId;
      state.expiresIn = action.payload.expiresIn;
    },
    clearUserToken(state) {
      state.userToken = null;
      state.userId = null;
      state.expiresIn = null;
    },
    clearAdminToken(state) {
      state.adminToken = null;
      state.adminId = null;
      state.expiresIn = null;
    },
  },
});

export const { setUserToken, setAdminToken, clearUserToken, clearAdminToken } =
  authSlice.actions;
export default authSlice.reducer;
