import {handleActions} from 'redux-actions';

import {createSetters} from '../../common/utils';

export const INITIAL_STATE = {
	search: '',
	youtubeResults: [],
	queue: [],
	currentlyPlaying: null
};

export const {set, setterReducers} = createSetters('uniplayer', INITIAL_STATE);

export default handleActions(
	{
		...setterReducers
	},
	INITIAL_STATE
);
