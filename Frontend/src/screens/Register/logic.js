import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  POST_REGISTER: {
    method: "POST",
    data: {},
    url: "/user/register",
  },
  POST_VERIFY: {
    method: "POST",
    data: {},
    url: "/user/verify",
  },
};

const registerInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const verifyMobileApiCall = createAsyncThunk(
  "post/user/verify",
  async (userData, { rejectWithValue }) => {
    const apiPayload = { ...API_CONFIG.POST_VERIFY };
    apiPayload.data = userData;
    try {
      const response = await apiClient.post("/user/verify", userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        props.navigation.dispatch(StackActions.replace("UserProfile"));
      }
      return response;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(serializableError);
    }
  }
);

const verifyMobileSlice = createSlice({
  name: "login",
  initialState: registerInitialState,
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
      .addCase(verifyMobileApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(verifyMobileApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(verifyMobileApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const registerApiCall = createAsyncThunk(
  "post/user/register",
  async (userData, { rejectWithValue }) => {
    const apiPayload = { ...API_CONFIG.POST_REGISTER };
    apiPayload.data = userData;
    try {
      const response = await apiClient.post("/user/register", userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(serializableError);
    }
  }
);

const registerSlice = createSlice({
  name: "login",
  initialState: registerInitialState,
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
      .addCase(registerApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(registerApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(registerApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const registerAction = registerSlice.actions;

const registerReducer = {
  registerData: registerSlice.reducer,
  verifyData: verifyMobileSlice.reducer,
};

export default registerReducer;
