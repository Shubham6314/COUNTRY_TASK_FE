import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countriesData: [],
  countriesDetailsData: null,
};

export const manageCountriesSlice = createSlice({
  name: "manageCountriesSlice",
  initialState,
  reducers: {
    updateCountriesList: (state, { payload }) => {
      state.countriesData = payload;
    },
    updateCountriesDetailsData: (state, { payload }) => {
      state.countriesDetailsData = payload;
    },
  },
});

export const { updateCountriesList, updateCountriesDetailsData } =
  manageCountriesSlice.actions;
export default manageCountriesSlice.reducer;
