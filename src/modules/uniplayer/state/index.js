import * as shades from 'shades';
import {handleActions} from 'redux-actions';

import {createSetters} from '../../common/utils';
import * as queueActions from '../../queue/state';

export const INITIAL_STATE = {
	search: '',
	youtubeResults: [],
	currentlyPlaying: null
};

export const {set, setterReducers} = createSetters('uniplayer', INITIAL_STATE);

export default handleActions(
	{
		...setterReducers,
		[queueActions.enqueue]: (state, {payload: track}) => (state.currentlyPlaying ? state : shades.set('currentlyPlaying')(track)(state))
	},
	INITIAL_STATE
);
