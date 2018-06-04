import {combineReducers} from 'redux';
import healthReducer from '../health';

const rootReducer = combineReducers({
	health: healthReducer
});

export default rootReducer;
