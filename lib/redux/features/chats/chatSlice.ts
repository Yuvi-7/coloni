import { createSlice } from "@reduxjs/toolkit";

export interface ChatState {
  socket: any;
  chatWith: any;
  messages: any;
}

const initialState: ChatState = {
  chatWith: {},
  socket: null,
  messages: [],
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
    dispatchMessages: (state, action) => {
      return { ...state, messages: [...state.messages, { ...action.payload }] };
    },
  },
});

export const { chatWithUser, socketInstance, dispatchMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
