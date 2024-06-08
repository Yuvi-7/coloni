import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface NotificationState {
  notifications: Array<any>;
  isLoading: boolean;
  message: string;
}

const initialState: NotificationState = {
  notifications: [],
  isLoading: false,
  message: "",
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (id: string) => {
    const res = await fetch(`/api/notification?userID=${id}`);
    const data = await res.json();
    return data;
  }
);

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        notifications:
          action?.payload?.notification?.length > 0
            ? [...action?.payload?.notification]
            : [],
      };
    });

    builder.addCase(fetchNotifications.rejected, (state, action: any) => {
      return {
        ...state,
        isLoading: false,
        message: action.payload?.message ?? "Failed to fetch notifications",
      };
    });
  },
});

export default notificationSlice.reducer;
