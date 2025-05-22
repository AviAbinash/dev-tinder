import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Inputs } from "../../types/authTypes";
import { PostMethod } from "../../service/http";
const initialState = {
  isLoggedIn: false,
  loginData: {},
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (data: Inputs, { dispatch }) => {
    try {
      const res = await PostMethod("login", data);
      localStorage.setItem("token", res?.data?.token);
      if (res && res.data) {
        dispatch(setLoginData(res.data));
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.loginData = action.payload;

      state.isLoggedIn = true;
    },
  },
});

const { setLoginData } = authSlice.actions;

export default authSlice.reducer;
