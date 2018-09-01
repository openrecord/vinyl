import {combineReducers} from 'redux';
import health from '../health/state';
import auth from '../auth/state';
import player from '../uniplayer/state';
import queue from '../queue/state';

const rootReducer = combineReducers({
	health,
	auth,
	player,
	queue
});

export default rootReducer;
