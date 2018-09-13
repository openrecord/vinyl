import _ from 'lodash';
import {set, updateAll, all, get, map} from 'shades';
import gql from 'graphql-tag';
import {makeMutation, toQueryString} from '../../common/utils';

export const updateSearch = (_, {search}, {cache}) => {
	const query = gql`
		query {
			player @client {
				search
			}
		}
	`;
	const prev = cache.readQuery({query});
	cache.writeData({query, data: set('player', 'search')(search)(prev)});

	return null;
};

const setResults = makeMutation(gql`
	query {
		player @client {
			youtubeResults
		}
	}
`)(set('player', 'youtubeResults'));

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

const searchYoutube = payload =>
	fetch(getYoutubeURL(payload))
		.then(r => r.json())
		.then(get('items'))
		.then(map(reshapeYoutubeResult));

const reshapeYoutubeResult = ({snippet, id: {videoId}}) => ({
	content: addYoutubeTypenames(snippet),
	type: 'youtube',
	id: videoId,
	__typename: 'YoutubeResult'
});

const addYoutubeTypenames = updateAll(
	set('__typename')('YoutubeSnippet'),
	set('thumbnails', '__typename')('YoutubeThumbnails'),
	set('thumbnails', all, '__typename')('YoutubeThumbnail')
);

const onSearch = _.throttle(async (search, cache) => {
	const results = await searchYoutube(search);
	return setResults(null, results, {cache});
}, 500);
