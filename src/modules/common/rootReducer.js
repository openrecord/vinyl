import {combineReducers} from 'redux';
import healthReducer from '../health';
import authReducer from '../auth';

const rootReducer = combineReducers({
	health: healthReducer,
	auth: authReducer
});

export default rootReducer;
