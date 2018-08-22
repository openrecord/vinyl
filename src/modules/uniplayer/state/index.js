import {toQueryString} from '../../common/utils';

export const SEARCH_CHANGED = 'player/SEARCH_CHANGED';
export const RECEIVE_YOUTUBE_RESULTS = 'player/RECEIVE_YOUTUBE_RESULTS';

export const INITIAL_STATE = {
	search: '',
	youtubeResults: []
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SEARCH_CHANGED:
			return {
				...state,
				search: action.payload
			};
		case RECEIVE_YOUTUBE_RESULTS:
			return {
				...state,
				youtubeResults: action.payload
			};
		default:
			return state;
	}
}

export function setSearch(query) {
	return {
		type: SEARCH_CHANGED,
		payload: query
	};
}

export function receiveYoutubeResults(results) {
	return {
		type: RECEIVE_YOUTUBE_RESULTS,
		payload: results
	};
}
