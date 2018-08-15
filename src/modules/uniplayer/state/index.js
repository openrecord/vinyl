import {toQueryString} from '../../common/utils';

export const SEARCH_CHANGED = 'player/SEARCH_CHANGED';
export const RECEIVE_RESULTS = 'player/RECEIVE_RESULTS';

export const INITIAL_STATE = {
	search: '',
	results: []
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SEARCH_CHANGED:
			return {
				...state,
				search: action.payload
			};
		case RECEIVE_RESULTS:
			return {
				...state,
				results: action.payload
			};
		default:
			return state;
	}
}

const YOUTUBE_API_KEY = 'AIzaSyCum4fCWhpcRNIh8VzD3Fhny5nxYYJrlTI';

export function getYoutubeURL(query) {
	const querystring = toQueryString({
		q: query,
		key: YOUTUBE_API_KEY,
		part: 'snippet',
		type: 'video',
		videoEmbeddable: true,
		maxResults: 25,
		fields: 'items/snippet'
	});

	return `https://www.googleapis.com/youtube/v3/search${querystring}`;
}

export function setSearch(query) {
	return {
		type: SEARCH_CHANGED,
		payload: query
	};
}

export function receiveResults(results) {
	return {
		type: RECEIVE_RESULTS,
		payload: results
	};
}
