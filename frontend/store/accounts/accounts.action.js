import { createAction } from "../../utils/reducer/reducer.utils";
import { ACCOUNTS_ACTION_TYPES } from "./accounts.types";

// Set initial Array
export const setAccounts = (accountsArray) =>
  createAction(ACCOUNTS_ACTION_TYPES.SET_ACCOUNTS, accountsArray);

// const removeFile = (files, fileToRemove) => {
//   return files.filter((file) => file.name !== fileToRemove.name);
// };

// const addFile = (files, fileToAdd) => {
//   return [...files, fileToAdd];
// };

// export const removeItemFromFiles = (files, fileToRemove) => {
//   const newFilesItems = removeFile(files, fileToRemove);
//   return createAction(ACCOUNTS_ACTION_TYPES.SET_ACCOUNTS, newFilesItems);
// };

// export const addItemToFiles = (files, fileToAdd) => {
//   const newFilesItems = addFile(files, fileToAdd);
//   return createAction(ACCOUNTS_ACTION_TYPES.SET_ACCOUNTS, newFilesItems);
// };
