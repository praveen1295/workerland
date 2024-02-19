import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_API_STATE = {
  data: null,
  error: null,
  isError: false,
  loading: true,
  flag: false,
};

const initialErrorState = {
  isError: false,
  error: null,
};

export const apiFailureSlice = createSlice({
  name: "commonApiError",
  initialState: initialErrorState,
  reducers: {
    apiFailure: (state, action) => {
      // eslint-disable-next-line no-console
      state.error = action.payload;
      state.isError = true;
    },
    resetApiFailure: (state) => {
      state.error = null;
      state.isError = false;
    },
  },
});

export const apiFailureAction = apiFailureSlice.actions;

const apiFailureReducer = { apiFailureError: apiFailureSlice.reducer };
export default apiFailureReducer;
