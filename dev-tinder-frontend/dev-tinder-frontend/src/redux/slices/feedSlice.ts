import { getData } from "@/service/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  feedata: [],
};

export const getFeedData = createAsyncThunk(
  "feed/data",
  async (url: string, { dispatch }) => {
    try {
      const res = await getData(url);
      if (res) {
        dispatch(setFeedData(res.data.feedData));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    setFeedData: (state, action) => {
      state.feedata = action.payload;
    },
  },
});

export const { setFeedData } = feedSlice.actions;

export default feedSlice.reducer;
