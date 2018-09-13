import {combineReducers} from 'redux';
import health from '../health/state';
import auth from '../auth/state';

const rootReducer = combineReducers({
	health,
	auth
});

export default rootReducer;
