export function setPendingState(state) {
  state.loading = true;
  state.data = null;
  state.error = null;
  state.isError = false;
  state.flag = false;
}

export function setFulFillState(state, action) {
  state.loading = false;
  state.data = action.payload;
  state.error = null;
  state.isError = false;
  state.flag = true;
}

export function setRejectedState(state, action) {
  state.loading = false;
  state.data = null;
  state.error = action.payload;
  state.isError = true;
  state.flag = false;
}

export function setResetState(state) {
  state.loading = false;
  state.data = null;
  state.error = null;
  state.flag = false;
  state.isError = false;
}

export function setFulFillPayloadState(state, action) {
  state.loading = false;
  state.data = action.payload.data.data;
  state.error = null;
  state.isError = false;
  state.flag = true;
}
