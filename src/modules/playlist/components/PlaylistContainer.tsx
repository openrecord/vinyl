import gql from 'graphql-tag';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';

import usePlaylistName from '../../common/hooks/usePlaylistName';
import { useStore } from '../../store';
import { useCreatePlaylist } from '../mutations/CreatePlaylist';
import Playlist from './Playlist';

const query = gql`
	query PlaylistQuery($playlist: String!) {
		playlist(where: {name: $playlist}) {
			id
			tracks {
				id
			}
		}
	}
`;

export default function PlaylistContainer() {
	const playlist = usePlaylistName();
	if (!playlist) {
		return null;
	}
	const {
		state: {
			search: {isSearchOpen},
			player: {live}
		},
		actions: {
			search: {toggle: searchToggler},
			player: {toggle: playerToggler}
		}
	} = useStore();

	const {
		data: {
			playlist: {tracks}
		}
	} = useQuery(query, {variables: {playlist}});
	const createPlaylist = useCreatePlaylist(playlist);

	return (
		<Playlist
			live={live}
			playlist={playlist}
			isSearchOpen={isSearchOpen}
			toggleSearch={searchToggler('isSearchOpen')}
			trackCount={tracks.length}
			createPlaylist={createPlaylist}
			toggleLive={playerToggler('live')}
		/>
	);
}
