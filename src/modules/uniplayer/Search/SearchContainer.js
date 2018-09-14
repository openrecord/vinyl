import React from 'react';

import Search from './Search';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import {toQueryString} from '../../common/utils';

const YOUTUBE_API_KEY = 'AIzaSyCum4fCWhpcRNIh8VzD3Fhny5nxYYJrlTI';

function getYoutubeURL(query) {
	return toQueryString({
		q: query,
		key: YOUTUBE_API_KEY,
		part: 'snippet',
		type: 'video',
		videoEmbeddable: true,
		maxResults: 25,
		fields: 'items(snippet,id)'
	});
}

const SEARCH_QUERY = gql`
	query SearchContainer {
		player @client {
			search
		}
	}
`;

const YOUTUBE_QUERY = gql`
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

const SET_SEARCH = gql`
	mutation UpdateSearch($search: String!) {
		updateSearch(search: $search) @client
	}
`;
const ENQUEUE = gql`
	mutation Enqueue($track: YoutubeResult!) {
		enqueue(track: $track) @client
	}
`;

const YoutubeQuery = ({search, children}) => {
	if (!search) {
		return children({data: {}});
	}
	return (
		<Query
			query={YOUTUBE_QUERY}
			variables={{path: getYoutubeURL(search)}}
			fetchPolicy="cache-and-network"
			context={{debounceKey: 'YoutubeSearch'}}>
			{children}
		</Query>
	);
};

export default () => (
	<Query query={SEARCH_QUERY}>
		{({
			data: {
				player: {search}
			}
		}) => (
			<YoutubeQuery search={search}>
				{({data: {youtubeResults}}) => (
					<Mutation mutation={SET_SEARCH}>
						{setSearch => (
							<Mutation mutation={ENQUEUE}>
								{enqueue => (
									<Search
										search={search}
										results={youtubeResults}
										setSearch={search => setSearch({variables: {search}})}
										enqueue={track => enqueue({variables: {track}})}
										clearSearch={() => setSearch({variables: {search: ''}})}
									/>
								)}
							</Mutation>
						)}
					</Mutation>
				)}
			</YoutubeQuery>
		)}
	</Query>
);
