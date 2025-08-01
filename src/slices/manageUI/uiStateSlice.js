import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const manageUiSlice = createSlice({
  name: "manageUiSlice",
  initialState,
  reducers: {
    updateLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { updateLoading } = manageUiSlice.actions;
export default manageUiSlice.reducer;
