import { createAction } from "../../utils/reducer/reducer.utils";
import { FILES_ACTION_TYPES } from "./files.types";

// Set initial Array
export const setFiles = (filesArray) =>
  createAction(FILES_ACTION_TYPES.SET_FILES, filesArray);

const removeFile = (files, fileToRemove) => {
  return files.filter((file) => file.name !== fileToRemove.name);
};

const addFile = (files, fileToAdd) => {
  return [...files, fileToAdd];
};

export const removeItemFromFiles = (files, fileToRemove) => {
  const newFilesItems = removeFile(files, fileToRemove);
  return createAction(FILES_ACTION_TYPES.SET_FILES, newFilesItems);
};

export const addItemToFiles = (files, fileToAdd) => {
  const newFilesItems = addFile(files, fileToAdd);
  return createAction(FILES_ACTION_TYPES.SET_FILES, newFilesItems);
};
