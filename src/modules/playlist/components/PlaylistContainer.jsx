import React from 'react';

import {Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';

import {nullToUndefined} from '../../common/utils';
import Playlist from './Playlist';
import PlaylistFragments from '../../common/fragments/PlaylistFragments';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import adapt from '../../common/components/Adapt';

const TOGGLE_SEARCH = gql`
	mutation ToggleSearch {
		toggleSearch @client
	}
`;

const CREATE_PLAYLIST = gql`
	mutation CreatePlaylist($playlist: String!) {
		upsertPlaylist(where: {name: $playlist}, create: {name: $playlist}, update: {}) {
			...AllPlaylist
		}
	}

	${PlaylistFragments.all}
`;

const createPlaylistUpdate = playlist => (cache, {data: {upsertPlaylist}}) => {
	const query = gql`
		query CreatePlaylistUpdate($playlist: String!) {
			playlist(where: {name: $playlist}) {
				...AllPlaylist
			}
		}
		${PlaylistFragments.all}
	`;
	cache.writeQuery({query, data: {playlist: upsertPlaylist}, variables: {playlist}});
};

const query = gql`
	query PlaylistQuery($playlist: String!) {
		search @client {
			isSearchOpen
		}

		playlist(where: {name: $playlist}) {
			id
			tracks {
				id
			}
		}
	}
`;

const Composed = adapt(
	{
		toggleSearch: <Mutation mutation={TOGGLE_SEARCH} />,
		playlist: <WithPlaylistId />
	},
	{
		data: ({render, playlist}) => (
			<Query query={query} variables={{playlist}}>
				{props => render(nullToUndefined(props.data))}
			</Query>
		),
		createPlaylist: ({render, playlist}) => (
			<Mutation
				mutation={CREATE_PLAYLIST}
				variables={{playlist}}
				update={createPlaylistUpdate(playlist)}
			>
				{render}
			</Mutation>
		)
	}
);

export default function PlaylistContainer() {
	return (
		<Composed>
			{({
				data: {search: {isSearchOpen} = {isSearchOpen: false}, playlist: {tracks} = {tracks: []}},
				toggleSearch,
				playlist,
				createPlaylist
			}) => (
				<Playlist
					playlist={playlist}
					isSearchOpen={isSearchOpen}
					toggleSearch={toggleSearch}
					trackCount={tracks.length}
					createPlaylist={createPlaylist}
				/>
			)}
		</Composed>
	);
}
