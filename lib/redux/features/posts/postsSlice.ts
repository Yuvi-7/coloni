import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PostState {
  posts: Array<any>;
  isLoading: boolean;
  message: string;
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  message: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch("/api/post");
  const data = await res.json();
  return data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        posts: [...action?.payload?.posts],
      };
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        message: action.payload?.message ?? "Failed to fetch posts",
      };
    });
  },
});

export default postSlice.reducer;
