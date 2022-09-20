import { FILES_ACTION_TYPES } from "./files.types";
export const FILES_INITIAL_STATE = {
  files: [],
};

export const filesReducer = (state = FILES_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FILES_ACTION_TYPES.SET_FILES:
      return {
        ...state,
        files: payload,
      };
    default:
      return state;
  }
};
