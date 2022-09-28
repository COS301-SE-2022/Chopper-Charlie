import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { pipelinesReducer } from './pipelines/pipelines.reducer';
import { filesReducer } from './files/files.reducer';
import { accountsReducer } from './accounts/accounts.reducer';

export const rootReducer = combineReducers({
	user: userReducer,
	pipelines: pipelinesReducer,
	files: filesReducer,
	accounts: accountsReducer,
});
