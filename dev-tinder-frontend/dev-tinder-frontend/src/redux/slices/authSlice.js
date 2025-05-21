import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: {},
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginData = action.payload;
    },
  },
});

const { login } = authSlice.actions;

export default authSlice.reducer;
