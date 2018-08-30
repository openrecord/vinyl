import {createAction, handleActions} from 'redux-actions';
import {mod, cons} from 'shades';

import {createSetters} from '../../common/utils';

export const INITIAL_STATE = {
	queue: [],
	isOpen: false
};

export const enqueue = createAction('queue/enqueue');

export const {set, setterReducers} = createSetters('queue', INITIAL_STATE);

export default handleActions(
	{
		...setterReducers,
		[enqueue]: (state, {payload: track}) => mod('queue')(cons(track))(state)
	},
	INITIAL_STATE
);
