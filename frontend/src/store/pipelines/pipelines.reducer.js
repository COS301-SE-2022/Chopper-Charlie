import { PIPELINES_ACTION_TYPES } from "./pipelines.types";
export const PIPELINES_INITIAL_STATE = {
    pipelines: [],
}


export const pipelinesReducer = (state = PIPELINES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
            case PIPELINES_ACTION_TYPES.SET_PIPELINES:
                return {
                    ...state,
                    pipelines: payload,
                };    
        default:
            return state;
    }
}