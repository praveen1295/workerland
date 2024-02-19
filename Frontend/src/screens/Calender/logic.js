import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  POST_SERVICE_PROVIDER: {
    method: "POST",
    data: {},
    url: "/serviceProvider/getServiceProviderById",
  },
  POST_BOOKING: {
    method: "POST",
    data: {},
    url: "/user/book-appointment",
  },
};

const serviceProviderInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const serviceProviderByIdApiCall = createAsyncThunk(
  "post/serviceProvider/getServiceProviderById",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.POST_SERVICE_PROVIDER };
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

const serviceProviderSlice = createSlice({
  name: "getServiceProvider",
  initialState: serviceProviderInitialState,
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
      .addCase(serviceProviderByIdApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(serviceProviderByIdApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(serviceProviderByIdApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

const bookingInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const bookingApiCall = createAsyncThunk(
  "post/user/book-appointment",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.POST_BOOKING };
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

const bookingSlice = createSlice({
  name: "book-appointment",
  initialState: bookingInitialState,
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
      .addCase(bookingApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(bookingApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(bookingApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const serviceProviderAction = serviceProviderSlice.actions;
export const bookingAction = bookingSlice.actions;

const serviceProviderReducer = {
  serviceProviderData: serviceProviderSlice.reducer,
  bookingData: bookingSlice.reducer,
};

export default serviceProviderReducer;
