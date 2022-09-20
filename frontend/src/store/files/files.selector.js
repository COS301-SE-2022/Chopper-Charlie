import { createSelector } from "reselect";

const selectFilesReducer = (state) => state.files;

export const selectFiles = createSelector(
  [selectFilesReducer],
  (filesSlice) => filesSlice.files
);
