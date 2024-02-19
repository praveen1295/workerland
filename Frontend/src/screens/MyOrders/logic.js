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
  POST_BOOKING_HISTORY: {
    method: "POST",
    data: {},
    url: "/user/getBookingHistory",
  },
  POST_UPDATE_BOOKING_STATUS: {
    method: "POST",
    data: {},
    url: "/serviceProvider/updateBookingStatus",
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

const bookingHistoryInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};
const updateBookingStatusState = {
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
      if (userData.user_id) {
        apiPayload.url += `?user_id=${userData.user_id}`;
      }
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

export const bookingHistoryApiCall = createAsyncThunk(
  "post/user/getBookingHistory",
  async (userData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.POST_BOOKING_HISTORY };
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

const bookingHistorySlice = createSlice({
  name: "getBookingHistory",
  initialState: bookingHistoryInitialState,
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
      .addCase(bookingHistoryApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(bookingHistoryApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(bookingHistoryApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const updateBookingStatusApiCall = createAsyncThunk(
  "post/admin/updateBookingStatus",
  async (bookingData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.POST_UPDATE_BOOKING_STATUS };
      apiPayload.data = bookingData;
      const response = await apiClient(apiPayload);

      return response;
    } catch (error) {
      // Extract serializable information from the AxiosError
      const serializableError = {
        message: error.message,
        // You can include other serializable properties if needed
      };
      return rejectWithValue(serializableError);
    }
  }
);

const updateBookingStatusSlice = createSlice({
  name: "changeStatus",
  initialState: updateBookingStatusState,
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
      .addCase(updateBookingStatusApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(updateBookingStatusApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(updateBookingStatusApiCall.rejected, (state, action) => {
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

const userChangeAccountStatusReducer = {
  changeAccountStatusData: changeAccountStatusSlice.reducer,
  getUserData: getUserDataSlice.reducer,
  bookingHistoryData: bookingHistorySlice.reducer,
  updateBookingStatusData: updateBookingStatusSlice.reducer,
};

export default userChangeAccountStatusReducer;
