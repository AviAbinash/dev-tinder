import { getData, postMethodUrl } from "@/service/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profile, connections,requests } from "../../types/profile";
interface State {
  userdata: profile | null;
  connectionData: connections[];
  requestData: requests[];
}
interface ReviewConnectionsArgs {
  requestId: string;
  status: string;
}

const initialState: State = {
  userdata: null,
  connectionData: [],
  requestData: [],
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

export const getUserRequests = createAsyncThunk(
  "profile/getUserRequests",
  async (url: string, { dispatch }) => {
    try {
      const res = await getData(url);
      console.log(res, "res");
      dispatch(setRequestData(res?.data?.requests));
    } catch (error) {
      console.log(error);
    }
  }
);

export const postReviewConnections = createAsyncThunk(
  "profile/postReviewConnections",
  async ({status,requestId}:ReviewConnectionsArgs, { dispatch }) => {
    try {
      const res = await postMethodUrl(`request/review/${status}/${requestId}`);
      console.log(res, "res");
      dispatch(setRequestData(res?.data?.requests));
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
    setRequestData: (state, action) => {
      state.requestData = action.payload;
    },
  },
});

export const { setUserData, setConnectiondata, setRequestData } =
  profileSlice.actions;

export default profileSlice.reducer;
