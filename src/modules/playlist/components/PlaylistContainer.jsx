import * as React from 'react';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import {nullToUndefined} from '../../common/utils';
import CreatePlaylist, {createPlaylistUpdate} from '../mutations/CreatePlaylist';
import Playlist from './Playlist';
import ToggleSearch from '../../common/mutations/ToggleSearch';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import adapt from '../../common/components/Adapt';

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
		toggleSearch: <ToggleSearch nullary />,
		playlist: <WithPlaylistId />
	},
	{
		data: ({render, playlist}) => (
			<Query query={query} variables={{playlist}}>
				{props => render(nullToUndefined(props.data))}
			</Query>
		),
		createPlaylist: ({render, playlist}) => (
			<CreatePlaylist variables={{playlist}} update={createPlaylistUpdate(playlist)}>
				{render}
			</CreatePlaylist>
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
