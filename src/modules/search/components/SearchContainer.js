import React from 'react';

import Search from './Search';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import YoutubeQuery from './YoutubeQueryContainer';

const SEARCH_QUERY = gql`
	query SearchContainer {
		search @client {
			query
		}
	}
`;

const UPDATE_QUERY = gql`
	mutation UpdateQuery($query: String!) {
		updateQuery(query: $query) @client
	}
`;
const ENQUEUE = gql`
	mutation Enqueue($track: YoutubeResult!) {
		enqueue(track: $track) @client
	}
`;

export default () => (
	<Query query={SEARCH_QUERY}>
		{({
			data: {
				search: {query}
			}
		}) => (
			<YoutubeQuery search={query}>
				{({data: {youtubeResults}}) => (
					<Mutation mutation={UPDATE_QUERY}>
						{updateQuery => (
							<Mutation mutation={ENQUEUE}>
								{enqueue => (
									<Search
										query={query}
										results={youtubeResults}
										setSearch={query => updateQuery({variables: {query}})}
										enqueue={track => enqueue({variables: {track}})}
										clearSearch={() => updateQuery({variables: {query: ''}})}
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
