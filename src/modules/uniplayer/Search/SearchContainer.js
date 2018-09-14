import React from 'react';

import Search from './Search';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import YoutubeQuery from './YoutubeQueryContainer';

const SEARCH_QUERY = gql`
	query SearchContainer {
		player @client {
			search
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
