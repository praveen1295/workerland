import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  POST_LOGIN: {
    method: "POST",
    data: {},
    url: "/user/getNotifications",
  },
};

const notificationInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const getNotificationApiCall = createAsyncThunk(
  "post/user/notifications",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.POST_LOGIN };
      apiPayload.data = userData;
      const response = await apiClient(apiPayload);

      return response;
    } catch (error) {
      console.error("errorrrrrr", error);
      // Extract serializable information from the AxiosError
      const serializableError = {
        message: error.message,
        // You can include other serializable properties if needed
      };
      return rejectWithValue(serializableError);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: notificationInitialState,
  reducers: {
    resetLogin: (state) => {
      state.data = null;
      state.error = null;
      state.flag = false;
      state.isError = false;
      state.loading = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNotificationApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(getNotificationApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(getNotificationApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const notificationsAction = notificationSlice.actions;

const notificationsReducer = {
  notificationsData: notificationSlice.reducer,
};

export default notificationsReducer;
