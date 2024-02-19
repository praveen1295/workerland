import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import { apiFailureAction } from "../commonApiLogic";

const API_CONFIG = {
  GET_SERVICE_PROVIDER_INFO: {
    method: "POST",
    data: {},
    url: "/serviceProvider/getServiceProviderInfo",
  },
};

const serviceProviderDataState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const getServiceProviderInfoApiCall = createAsyncThunk(
  "post/serviceProvider/getServiceProviderInfo",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const apiPayload = { ...API_CONFIG.GET_SERVICE_PROVIDER_INFO };
      apiPayload.data = userData;
      const response = await apiClient(apiPayload);

      return response;
    } catch (error) {
      dispatch(apiFailureAction.apiFailure(error));

      const serializableError = {
        message: error.message,
      };
      return rejectWithValue(serializableError);
    }
  }
);

const getServiceProviderInfoSlice = createSlice({
  name: "getServiceProviderInfo",
  initialState: serviceProviderDataState,
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
      .addCase(getServiceProviderInfoApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(getServiceProviderInfoApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(getServiceProviderInfoApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const getServiceProviderInfoAction = getServiceProviderInfoSlice.actions;

const getServiceProviderInfo = {
  serviceProviderInfo: getServiceProviderInfoSlice.reducer,
};

export default getServiceProviderInfo;
