import {ajax} from 'rxjs/ajax';
import {debounceTime, map, flatMap} from 'rxjs/operators';

import {toQueryString} from '../../common/utils';
import * as playerActions from '.';

const YOUTUBE_API_KEY = 'AIzaSyCum4fCWhpcRNIh8VzD3Fhny5nxYYJrlTI';

export function getYoutubeURL(query) {
	const querystring = toQueryString({
		q: query,
		key: YOUTUBE_API_KEY,
		part: 'snippet',
		type: 'video',
		videoEmbeddable: true,
		maxResults: 25,
		fields: 'items(snippet,id)'
	});

	return `https://www.googleapis.com/youtube/v3/search${querystring}`;
}

const reshapeResult = ({snippet, id: {videoId}}) => ({
	...snippet,
	id: videoId
});

const onSearch = action$ =>
	action$.ofType(playerActions.SEARCH_CHANGED).pipe(
		debounceTime(500),
		flatMap(({payload}) => ajax(getYoutubeURL(payload))),
		map(e => e.response.items.map(reshapeResult)),
		map(playerActions.receiveYoutubeResults)
	);

export default [onSearch];
