import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils";

const API_CONFIG = {
  GET_REVIEWS: {
    method: "GET",
    data: {},
    url: "/serviceProvider/getReviews",
  },
  POST_REVIEWS: {
    method: "POST",
    data: {},
    url: "/serviceProvider/createReview",
  },
};

const reviewInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

const createReviewInitialState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const createReviewApiCall = createAsyncThunk(
  "post/serviceProvider/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.POST_REVIEWS };
      apiPayload.data = reviewData;
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

const createReviewSlice = createSlice({
  name: "getReview",
  initialState: createReviewInitialState,
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
      .addCase(createReviewApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(createReviewApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(createReviewApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const getReviewApiCall = createAsyncThunk(
  "post/serviceProvider/getReview",
  async (query, { rejectWithValue }) => {
    try {
      const apiPayload = { ...API_CONFIG.GET_REVIEWS };
      apiPayload.url += `/${query.serviceProviderId}/${query.page}/${query.pageSize}`;
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

const reviewSlice = createSlice({
  name: "getReview",
  initialState: reviewInitialState,
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
      .addCase(getReviewApiCall.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.isError = false;
        state.flag = false;
      })
      .addCase(getReviewApiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.isError = false;
        state.flag = true;
      })
      .addCase(getReviewApiCall.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.isError = true;
        state.flag = false;
      });
  },
});

export const reviewAction = reviewSlice.actions;

const reviewReducer = {
  getReviewData: reviewSlice.reducer,
  createReviewData: createReviewSlice.reducer,
};

export default reviewReducer;
