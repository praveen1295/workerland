import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  GET_BOOKING_DATA: {
    method: "POST",
    data: {},
    url: "/serviceProvider/getBookingById",
  },
};

const bookingState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const getBookingByIdApiCall = createAsyncThunk(
  "post/serviceProvider/getBookingById",
  async (bookingData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.GET_BOOKING_DATA };
      apiPayload.data = bookingData;
      const response = await apiClient(apiPayload);

      return response;
    } catch (error) {
      const serializableError = {
        message: error.message,
      };
      return rejectWithValue(serializableError);
    }
  }
);

const getBookingByIdSlice = createSlice({
  name: "getUser",
  initialState: bookingState,
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
      .addCase(getBookingByIdApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(getBookingByIdApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(getBookingByIdApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const getServiceProviderDataAction = getBookingByIdSlice.actions;

const getBookingReducer = {
  booking: getBookingByIdSlice.reducer,
};

export default getBookingReducer;
