import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  POST_UPDATE_AVAILABILITY: {
    method: "POST",
    data: {},
    url: "/serviceProvider/updateAvailability",
  },
};

const updateAvailabilityInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const updateAvailabilityApiCall = createAsyncThunk(
  "post/serviceProvider/updateAvailability",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.POST_UPDATE_AVAILABILITY };
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

const updateAvailabilitySlice = createSlice({
  name: "book-appointment",
  initialState: updateAvailabilityInitialState,
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
      .addCase(updateAvailabilityApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(updateAvailabilityApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(updateAvailabilityApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const bookingAction = updateAvailabilitySlice.actions;

const updateAvailabilityReducer = {
  bookingData: updateAvailabilitySlice.reducer,
};

export default updateAvailabilityReducer;
