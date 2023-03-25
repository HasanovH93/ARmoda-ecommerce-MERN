import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    message: null,
  },
  reducers: {
    setErrorMessage: (state, action) => {
      state.message = action.payload;
    },
    clearErrorMessage: (state) => {
      state.message = null;
    },
  },
});

export const { setErrorMessage, clearErrorMessage } = errorSlice.actions;
export default errorSlice.reducer;
