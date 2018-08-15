import {combineReducers} from 'redux';
import health from '../health/state';
import auth from '../auth/state';
import player from '../uniplayer/state';

const rootReducer = combineReducers({
	health,
	auth,
	player
});

export default rootReducer;
