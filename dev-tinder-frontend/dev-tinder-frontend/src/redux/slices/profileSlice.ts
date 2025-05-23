import { getData } from "@/service/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profile } from "../../types/profile";
interface State {
  userdata: profile | null;
}

const initialState: State = {
  userdata: null,
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

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userdata = action.payload;
    },
  },
});

export const { setUserData } = profileSlice.actions;

export default profileSlice.reducer;
