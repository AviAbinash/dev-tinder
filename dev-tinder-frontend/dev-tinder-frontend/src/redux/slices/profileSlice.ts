import { getData } from "@/service/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profile,connections } from "../../types/profile";
interface State {
  userdata: profile | null;
  connectionData:connections[];
}

const initialState: State = {
  userdata: null,
  connectionData: [],
};

export const getUserdata = createAsyncThunk(
  "/profile/getdata",
  async (url: string, { dispatch }) => {
    try {
      const res = await getData(url);
      console.log(res);
      if (res) {
        dispatch(setUserData(res.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserConnections = createAsyncThunk(
  "profile/getConnections",
  async (url: string, { dispatch }) => {
    try {
      const res = await getData(url);
      console.log(res, "res");
      dispatch(setConnectiondata(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  }
);

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userdata = action.payload;
    },
    setConnectiondata: (state, action) => {
      state.connectionData = action.payload;
    },
  },
});

export const { setUserData, setConnectiondata } = profileSlice.actions;

export default profileSlice.reducer;
