import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  POST_LOGIN: {
    method: "POST",
    data: {},
    url: "/user/forgetPassword",
  },
};

const forgetPasswordIInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const forgetPasswordApiCall = createAsyncThunk(
  "post/user/forgetPassword",
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

const forgetPasswordSlice = createSlice({
  name: "login",
  initialState: forgetPasswordIInitialState,
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
      .addCase(forgetPasswordApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(forgetPasswordApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(forgetPasswordApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const loginAction = forgetPasswordSlice.actions;

const forgetPasswordReducer = {
  forgetPasswordData: forgetPasswordSlice.reducer,
};

export default forgetPasswordReducer;
