import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  POST_CHANGE_STATUS: {
    method: "POST",
    data: {},
    url: "/admin/changeAccountStatus",
  },
  GET_USER_DATA: {
    method: "GET",
    data: {},
    url: "/user/getUserData",
  },
  GET_REQUESTS: {
    method: "POST",
    data: {},
    url: "/admin/getRequests",
  },
};

const changeStatusInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

const userDataState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const getUserDataApiCall = createAsyncThunk(
  "post/admin/changeAccountStatus",
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

export const changeAccountStatusApiCall = createAsyncThunk(
  "post/admin/changeAccountStatus",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.POST_CHANGE_STATUS };
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

const changeAccountStatusSlice = createSlice({
  name: "changeStatus",
  initialState: changeStatusInitialState,
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
      .addCase(changeAccountStatusApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(changeAccountStatusApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(changeAccountStatusApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const getRequestsApiCAll = createAsyncThunk(
  "post/admin/getRequests",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.GET_REQUESTS };
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

const getRequestsSlice = createSlice({
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
      .addCase(getRequestsApiCAll.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(getRequestsApiCAll.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(getRequestsApiCAll.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const changeStatusAction = changeAccountStatusSlice.actions;
export const getUserDataAction = getUserDataSlice.actions;
export const getRequestsAction = getRequestsSlice.actions;

const adminChangeAccountStatusReducer = {
  changeAccountStatusData: changeAccountStatusSlice.reducer,
  userData: getUserDataSlice.reducer,
  getRequests: getRequestsSlice.reducer,
};

export default adminChangeAccountStatusReducer;
