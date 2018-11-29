import gql from 'graphql-tag';
import * as React from 'react';

import usePlaylistName from '../../common/hooks/usePlaylistName';
import {useSimpleQuery} from '../../common/utils';
import {$Playlist} from '../../search/components/types';
import {useStore} from '../../store';
import {useCreatePlaylist} from '../mutations/CreatePlaylist';
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

interface $QueryData {
	playlist: $Playlist;
}

export default function PlaylistContainer() {
	const playlist = usePlaylistName();
	if (!playlist) {
		return null;
	}
	const {
		state: {
			search: {isOpen},
			player: {live, color}
		},
		actions: {
			search: {toggle: searchToggler},
			player: {toggle: playerToggler}
		}
	} = useStore();

	const {
		data: {playlist: {tracks} = {tracks: []}}
	} = useSimpleQuery<$QueryData>(query, {playlist});
	const createPlaylist = useCreatePlaylist(playlist);

	return (
		<Playlist
			color={color}
			live={live}
			playlist={playlist}
			isOpen={isOpen}
			toggleSearch={searchToggler('isOpen')}
			trackCount={tracks.length}
			createPlaylist={createPlaylist}
			toggleLive={playerToggler('live')}
		/>
	);
}
