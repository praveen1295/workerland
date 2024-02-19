import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "./apiClient";

const API_CONFIG = {
  GET_USER_DATA: {
    method: "GET",
    data: {},
    url: "/serviceProvider/getServiceProvider",
  },
};

const userDataState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const getServiceProviderDataApiCall = createAsyncThunk(
  "post/serviceProvider/getServiceProvider",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.GET_USER_DATA };
      apiPayload.data = userData;
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

const getServiceProviderDataSlice = createSlice({
  name: "getUser",
  initialState: userDataState,
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
      .addCase(getServiceProviderDataApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(getServiceProviderDataApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(getServiceProviderDataApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const getServiceProviderDataAction = getServiceProviderDataSlice.actions;

const getServiceProviderReducer = {
  userData: getServiceProviderDataSlice.reducer,
};

export default getServiceProviderReducer;
