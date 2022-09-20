import { ACCOUNTS_ACTION_TYPES } from "./accounts.types";
export const ACCOUNTS_INITIAL_STATE = {
  accounts: [],
};

export const accountsReducer = (state = ACCOUNTS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNTS_ACTION_TYPES.SET_ACCOUNTS:
      return {
        ...state,
        accounts: payload,
      };
    default:
      return state;
  }
};
