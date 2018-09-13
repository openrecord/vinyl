import React from 'react';

import Search from './Search';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import {adopt} from 'react-adopt';

const SEARCH_QUERY = gql`
	query SearchContainer {
		player @client {
			search
			youtubeResults {
				id
				__typename
				content {
					title
					thumbnails {
						default {
							url
						}
						high {
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
	mutation Enqueue($search: YoutubeResult!) {
		enqueue(search: $search) @client
	}
`;

const Composed = adopt({
	data: ({render}) => <Query query={SEARCH_QUERY}>{({data: {player}}) => render(player)}</Query>,
	setSearch: <Mutation mutation={SET_SEARCH} />,
	enqueue: <Mutation mutation={ENQUEUE} />
});

export default () => (
	<Composed>
		{({data: {search, youtubeResults}, enqueue, setSearch}) => (
			<Search
				search={search}
				results={youtubeResults}
				setSearch={search => setSearch({variables: {search}})}
				enqueue={track => enqueue({variables: {track}})}
				clearSearch={() => setSearch({variables: {search: ''}})}
			/>
		)}
	</Composed>
);
