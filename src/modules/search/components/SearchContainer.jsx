import {toast} from 'react-toastify';
import React from 'react';

import {Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';

import PlaylistFragments from '../../common/fragments/PlaylistFragments';
import Search from './Search';
import Toast from '../../common/components/Toast';
import TrackSearchContainer from './TrackSearchContainer';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import adapt from '../../common/components/Adapt';

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
	mutation AddToPlaylist(
		$url: String!
		$thumbnail: String!
		$title: String!
		$playlist: String!
		$source: TrackSource!
	) {
		upsertTrackInfo(
			where: {url: $url}
			create: {thumbnail: $thumbnail, title: $title, url: $url, source: $source}
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

function variablesForAddToPlaylist(track, playlist) {
	switch (track.__typename) {
		case 'YoutubeResult':
			return {
				url: 'https://www.youtube.com/watch?v=' + track.id.videoId,
				thumbnail: track.snippet.thumbnails.default.url,
				title: track.snippet.title,
				source: 'YOUTUBE',
				playlist
			};
		case 'SoundCloudResult':
			return {
				...track,
				source: 'SOUNDCLOUD',
				playlist
			};
	}
}

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
		results: ({query, render}) => (
			<TrackSearchContainer search={query}>
				{props => render(props.data.results)}
			</TrackSearchContainer>
		)
	}
);

export default function SearchContainer() {
	return (
		<Composed>
			{({query, playlist, results, updateQuery, addToPlaylist, toggleSearch}) => (
				<Search
					toggleSearch={toggleSearch}
					query={query}
					results={results}
					setSearch={query => updateQuery({variables: {query}})}
					enqueue={track => {
						addToPlaylist({variables: variablesForAddToPlaylist(track, playlist)});
						toast(<Toast message="Song Added!" />);
					}}
					clearSearch={() => updateQuery({variables: {query: ''}})}
				/>
			)}
		</Composed>
	);
}
