import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "./apiClient";

const API_CONFIG = {
  GET_USER_DATA: {
    method: "GET",
    data: {},
    url: "/user/getUserData",
  },
};

const userDataState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const getUserDataApiCall = createAsyncThunk(
  "post/admin/getUserData",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.GET_USER_DATA };
      if (userData.user_id) {
        apiPayload.url += `?user_id=${userData.user_id}`;
      }
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

const getUserDataSlice = createSlice({
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
      .addCase(getUserDataApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(getUserDataApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(getUserDataApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const getUserDataAction = getUserDataSlice.actions;

const getUserReducer = {
  userData: getUserDataSlice.reducer,
};

export default getUserReducer;
