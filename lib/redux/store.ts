import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/PostsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      post: postReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
