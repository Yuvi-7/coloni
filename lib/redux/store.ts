import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postsSlice";
import notificationReducer from "./features/notifications/notificationSlice";
import chatReducer from "./features/chats/chatSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      post: postReducer,
      notification: notificationReducer,
      chat: chatReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
