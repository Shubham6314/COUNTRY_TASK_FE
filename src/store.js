import { configureStore } from "@reduxjs/toolkit";
import manageCountriesReducer from "./slices/manageCountries/countriesSlice";
import manageUiReducer from "./slices/manageUI/uiStateSlice";

export const store = configureStore({
  reducer: {
    manageCountriesSlice: manageCountriesReducer,
    manageUiSlice: manageUiReducer,
  },
});
