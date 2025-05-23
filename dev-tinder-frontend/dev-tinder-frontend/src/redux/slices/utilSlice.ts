import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showTaost: false,
};
const utilSlice = createSlice({
  name: "utilSlice",
  initialState,
  reducers: {
    setShowToast: (state, action) => {
      state.showTaost = action.payload;
    },
  },
});

export const { setShowToast } = utilSlice.actions;
export default utilSlice.reducer;
