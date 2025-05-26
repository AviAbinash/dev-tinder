import { getData, postMethodUrl } from "@/service/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profile, connections, requests, feedData } from "../../types/profile";
interface State {
  userdata: profile | null;
  connectionData: connections[];
  requestData: requests[];
  userFeedData: feedData[];
  sendConnectiondata: feedData[];
}
interface ReviewConnectionsArgs {
  requestId: string;
  status: string;
}

const initialState: State = {
  userdata: null,
  connectionData: [],
  requestData: [],
  userFeedData: [],
  sendConnectiondata: [],
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

export const getUserFeed = createAsyncThunk(
  "/profile/getUserFeed",
  async (url: string, { dispatch }) => {
    try {
      const res = await getData(url);
      console.log(res, "res");
      if (res) {
        dispatch(setuserFeedData(res.data.feedData));
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
  async ({ status, requestId }: ReviewConnectionsArgs, { dispatch }) => {
    try {
      const res = await postMethodUrl(`request/review/${status}/${requestId}`);
      console.log(res, "res");
      dispatch(setRequestData(res?.data?.requests));
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSendConnections = createAsyncThunk(
  "profile/postSendConnections",
  async ({ status, requestId }: ReviewConnectionsArgs, { dispatch }) => {
    try {
      const res = await postMethodUrl(`request/send/${status}/${requestId}`);
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
    setuserFeedData: (state, action) => {
      state.userFeedData = action.payload;
    },
    setSendConnectiondata: (state, action) => {
      state.sendConnectiondata = action.payload;
    },
    setRemovefeedById: (state, action) => {
      //  state.userFeedData = action.payload
      const newFeed = state.userFeedData.filter((ele) => {
        return ele?._id != action.payload;
      });
      state.userFeedData = newFeed;
    },
  },
});

export const {
  setUserData,
  setConnectiondata,
  setRequestData,
  setuserFeedData,
  setRemovefeedById,
} = profileSlice.actions;

export default profileSlice.reducer;
