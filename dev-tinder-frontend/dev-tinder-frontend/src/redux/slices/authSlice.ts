import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Inputs } from "../../types/authTypes";
import { PostMethod } from "../../service/http";

export interface LoginData {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}


interface AuthState {
  isLoggedIn: boolean;
  loginData: LoginData | null;
}


const initialState: AuthState = {
  isLoggedIn: false,
  loginData: null, 
};

export const userSignUp = createAsyncThunk(
  "user/signup",
  async (data: Inputs) => {
    try {
      const res = await PostMethod("register", data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const userLogin = createAsyncThunk(
  "user/login",
  async (data: Inputs, { dispatch }) => {
    try {
      const res = await PostMethod("login", data);
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("userData", res?.data?.user);
      if (res && res.data) {
        dispatch(setLoginData(res.data.user));
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async (url: string) => {
    try {
      const res = await PostMethod(url);
      console.log(res);

      if (res && res.data.message) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
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
      state.loginData = action?.payload;
    },
    setIsLogIn: (state, action) => {
      state.isLoggedIn = action?.payload;
    },
  },
});

export const { setLoginData, setIsLogIn } = authSlice.actions;

export default authSlice.reducer;
