import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  POST_VERIFY_OTP: {
    method: "POST",
    data: {},
    url: "/user/verifyOtp",
  },
  POST_SEND_OTP: {
    method: "POST",
    data: {},
    url: "/user/sendOtp",
  },
};

const otpVerificationInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const sendOtpApiCall = createAsyncThunk(
  "post/user/sendOtp",
  async (userData, { rejectWithValue }) => {
    const apiPayload = { ...API_CONFIG.POST_SEND_OTP };
    apiPayload.data = userData;
    try {
      const response = await apiClient.post("/user/sendOtp", userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error);
    }
  }
);

const sendOtpSlice = createSlice({
  name: "sendOtp",
  initialState: otpVerificationInitialState,
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
      .addCase(sendOtpApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(sendOtpApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(sendOtpApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const verifyOtpApiCall = createAsyncThunk(
  "post/user/verifyOtp",
  async (userData, { rejectWithValue }) => {
    const apiPayload = { ...API_CONFIG.POST_VERIFY_OTP };
    apiPayload.data = userData;
    try {
      const response = await apiClient.post("/user/verifyOtp", userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error);
    }
  }
);

const verifyOtpSlice = createSlice({
  name: "login",
  initialState: otpVerificationInitialState,
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
      .addCase(verifyOtpApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(verifyOtpApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(verifyOtpApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const registerAction = verifyOtpSlice.actions;

const otpReducer = {
  verifyOtpData: verifyOtpSlice.reducer,
  sendOtpData: sendOtpSlice.reducer,
};

export default otpReducer;
