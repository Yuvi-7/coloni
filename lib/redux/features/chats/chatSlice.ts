import { createSlice } from "@reduxjs/toolkit";

export interface ChatState {
  socket: any;
  chatWith: any;
}

const initialState: ChatState = {
  chatWith: {},
  socket: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatWithUser: (state, action) => {
      return { ...state, chatWith: action.payload };
    },
    socketInstance: (state, action) => {
      return { ...state, socket: action.payload };
    },
  },
});

export const { chatWithUser, socketInstance } = chatSlice.actions;
export default chatSlice.reducer;
