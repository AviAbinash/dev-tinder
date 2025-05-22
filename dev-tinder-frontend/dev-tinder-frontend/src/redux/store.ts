import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import feedSlice from "./slices/feedSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    feed: feedSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
