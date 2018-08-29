import {handleActions} from 'redux-actions';

import {createSetters} from '../../common/utils';

export const INITIAL_STATE = {
	queue: [],
	isOpen: false
};

export const {set, setterReducers} = createSetters('queue', INITIAL_STATE);

export default handleActions(
	{
		...setterReducers
	},
	INITIAL_STATE
);
