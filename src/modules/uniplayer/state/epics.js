import {of} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {debounceTime, map, flatMap} from 'rxjs/operators';

import {toQueryString} from '../../common/utils';
import * as playerActions from '.';

const YOUTUBE_API_KEY = 'AIzaSyCum4fCWhpcRNIh8VzD3Fhny5nxYYJrlTI';

function getYoutubeURL(query) {
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

const searchYoutube = payload => ajax(getYoutubeURL(payload)).pipe(map(e => e.response.items.map(reshapeYoutubeResult)));

const reshapeYoutubeResult = ({snippet, id: {videoId}}) => ({
	content: snippet,
	type: 'youtube',
	id: videoId
});

const onSearch = action$ =>
	action$.ofType(playerActions.set.search.toString()).pipe(
		debounceTime(500),
		flatMap(({payload}) => (payload ? searchYoutube(payload) : of([]))),
		map(playerActions.set.youtubeResults)
	);

export default [onSearch];
