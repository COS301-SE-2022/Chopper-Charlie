import { createSelector } from "reselect";

const selectAccountsReducer = (state) => state.accounts;

export const selectAccounts = createSelector(
  [selectAccountsReducer],
  (accountsSlice) => accountsSlice.accounts
);
