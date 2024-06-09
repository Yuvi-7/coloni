import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface FriendSlice {
  friends: Array<any>;
  isLoading: boolean;
  message: string;
}

const initialState: FriendSlice = {
  friends: [],
  isLoading: false,
  message: "",
};

export const fetchFriends = createAsyncThunk(
  "friend/fetchFriends",
  async () => {
    const res = await fetch("/api/friends");
    const data = await res.json();
    return data;
  }
);

export const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        friends:
          action?.payload?.friends?.length > 0
            ? [...action?.payload?.friends]
            : [],
      };
    });

    builder.addCase(fetchFriends.rejected, (state, action: any) => {
      return {
        ...state,
        isLoading: false,
        message: action.payload?.message ?? "Failed to fetch friends",
      };
    });
  },
});

export default friendSlice.reducer;
