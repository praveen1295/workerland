import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  LOCAL_SERVICE_PROVIDER: {
    method: "POST",
    data: {},
    url: "user/local-service-provider-list",
  },
};

const localServiceProvidersInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const localServiceProvidersApiCall = createAsyncThunk(
  "post/user/local-service-provider-list",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.LOCAL_SERVICE_PROVIDER };
      apiPayload.data = userData;
      const response = await apiClient(apiPayload);

      return response;
    } catch (error) {
      console.error("localServiceProvidersApiCallError", error);
      return rejectWithValue(error);
    }
  }
);

const localServiceProvidersSlice = createSlice({
  name: "localServiceProviders",
  initialState: localServiceProvidersInitialState,
  reducers: {
    resetLocalServiceProviders: (state) => {
      state.data = null;
      state.error = null;
      state.flag = false;
      state.isError = false;
      state.loading = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(localServiceProvidersApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(localServiceProvidersApiCall.fulfilled, (state, action) => {
        console.error("Extra information:", action.payload);

        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(localServiceProvidersApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const localServiceProvidersActins = localServiceProvidersSlice.actions;

const localServiceProviders = {
  localServiceProvidersData: localServiceProvidersSlice.reducer,
};

export default localServiceProviders;
