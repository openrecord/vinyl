import React from 'react';

import Search from './Search';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';

import YoutubeQuery from './YoutubeQueryContainer';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import adapt from '../../common/components/Adapt';
import PlaylistFragments from '../../common/fragments/PlaylistFragments';
import TrackFragments from '../../common/fragments/TrackFragments';
import {toast} from 'react-toastify';
import Toast from '../../common/components/Toast';

const TOGGLE_SEARCH = gql`
	mutation ToggleSearch {
		toggleSearch @client
	}
`;


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

const ADD_TO_PLAYLIST = gql`
	mutation AddToPlaylist($url: String!, $thumbnail: String!, $title: String!, $playlist: String!) {
		upsertTrackInfo(
			where: {url: $url}
			create: {thumbnail: $thumbnail, title: $title, url: $url, source: YOUTUBE}
			update: {}
		) {
			id
		}

		upsertPlaylist(where: {name: $playlist}, create: {name: $playlist}, update: {}) {
			id
		}

		updatePlaylist(
			where: {name: $playlist}
			data: {tracks: {create: [{info: {connect: {url: $url}}}]}}
		) {
			...AllPlaylist
		}
	}
	${PlaylistFragments.all}
`;

const addToPlaylistUpdate = playlist => (cache, {data: {updatePlaylist}}) => {
	const query = gql`
		query Queue($playlist: String!) {
			playlist(where: {name: $playlist}) {
				...AllPlaylist
			}
		}
		${PlaylistFragments.all}
	`;

	const data = cache.readQuery({query, variables: {playlist}});

	if (data.playlist === null) {
		cache.writeQuery({
			query,
			data: {playlist: updatePlaylist},
			variables: {playlist}
		});
	}
};

const Composed = adapt(
	{
		toggleSearch: <Mutation mutation={TOGGLE_SEARCH} />,
		playlist: <WithPlaylistId />,
		updateQuery: <Mutation mutation={UPDATE_QUERY} />,
		addToPlaylist: <Mutation mutation={ADD_TO_PLAYLIST} />,
		query: ({render}) => (
			<Query query={SEARCH_QUERY}>{props => render(props.data.search.query)}</Query>
		)
	},
	{
		youtubeResults: ({query, render}) => (
			<YoutubeQuery search={query}>{props => render(props.data.youtubeResults)}</YoutubeQuery>
		)
	}
);

export default function SearchContainer() {
	return (
		<Composed>
			{({query, playlist, youtubeResults, updateQuery, addToPlaylist, toggleSearch}) => (
				<Search
					toggleSearch={toggleSearch}
					query={query}
					results={youtubeResults}
					setSearch={query => updateQuery({variables: {query}})}
					enqueue={track => {
						addToPlaylist({
							variables: {
								url: track.id.videoId,
								thumbnail: track.snippet.thumbnails.default.url,
								title: track.snippet.title,
								playlist
							},
							update: addToPlaylistUpdate(playlist)
						});
						toast(<Toast message="Song Added!" />);
					}}
					clearSearch={() => updateQuery({variables: {query: ''}})}
				/>
			)}
		</Composed>
	);
}
