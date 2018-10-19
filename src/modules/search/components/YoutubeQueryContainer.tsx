import * as React from 'react';
import {toQueryString} from '../../common/utils';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {DocumentNode} from 'graphql';

const YOUTUBE_API_KEY = 'AIzaSyCum4fCWhpcRNIh8VzD3Fhny5nxYYJrlTI';

function getYoutubeURL(query: string) {
	return toQueryString({
		q: query,
		key: YOUTUBE_API_KEY,
		part: 'snippet',
		type: 'video',
		videoEmbeddable: true,
		maxResults: 10,
		fields: 'items(snippet,id)'
	});
}

const query: DocumentNode = gql`
	query Youtube($path: String!) {
		youtubeResults @rest(type: "YoutubePayload", endpoint: "youtube", path: $path) {
			items @type(name: "YoutubeResult") {
				id @type(name: "YoutubeId") {
					videoId
				}
				snippet @type(name: "YoutubeSnippet") {
					title
					thumbnails @type(name: "YoutubeThumbails") {
						default @type(name: "YoutubeThumbnailDefault") {
							url
						}
						high @type(name: "YoutubeThumbnailHigh") {
							url
						}
					}
				}
			}
		}
	}
`;

export interface $YoutubeResult {
	__typename: 'YoutubeResult';
	id: {
		videoId: string;
	};
	snippet: {
		title: string;
		thumbnails: {
			default: {
				url: string;
			};
			high: {
				url: string;
			};
		};
	};
}
interface $Props {
	search: string;
	children(data: $YoutubeResult[]): JSX.Element;
}

export default ({search, children}: $Props) => {
	if (!search) {
		return children([]);
	}
	return (
		<Query
			query={query}
			variables={{path: getYoutubeURL(search)}}
			fetchPolicy="network-only"
			context={{debounceKey: 'YoutubeSearch'}}
		>
			{({data}) => children((data && data.youtubeResults && data.youtubeResults.items) || [])}
		</Query>
	);
};
