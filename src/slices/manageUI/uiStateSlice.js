import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

export const manageUiSlice = createSlice({
  name: "manageUiSlice",
  initialState,
  reducers: {
    updateLoading: (state, { payload }) => {
      state.loading = payload;
    },
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { updateLoading, updateError } = manageUiSlice.actions;
export default manageUiSlice.reducer;
