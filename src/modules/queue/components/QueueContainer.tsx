import gql from 'graphql-tag';
import * as React from 'react';
import {Subscription} from 'react-apollo';
import {toast} from 'react-toastify';

import Toast from '../../common/components/Toast';
import PlaylistFragments from '../../common/fragments/PlaylistFragments';
import usePlaylistName from '../../common/hooks/usePlaylistName';
import useUpdatePlaying from '../../common/mutations/UpdatePlaying';
import {useSimpleQuery} from '../../common/utils';
import {$Track} from '../../search/components/types';
import {useStore} from '../../store';
import useDeleteTrack from '../mutations/DeleteTrack';
import Queue from './Queue';

const query = gql`
	query Queue($playlist: String!) {
		playlist(where: {name: $playlist}) {
			...AllPlaylist
		}
	}
	${PlaylistFragments.all}
`;

interface $QueryData {
	playlist: {
		id: string;
		name: string;
		tracks: $Track[];
	};
}
const ON_TRACK_ADDED = gql`
	subscription OnTrackAdded($playlist: String!) {
		playlist(where: {node: {name: $playlist}}) {
			node {
				...AllPlaylist
			}
		}
	}
	${PlaylistFragments.all}
`;

export default function QueueContainer() {
	const playlist = usePlaylistName();
	if (!playlist) {
		return null;
	}

	const {
		data: {playlist: {tracks} = {tracks: []}}
	} = useSimpleQuery<$QueryData>(query, {playlist});

	const {
		state: {
			player: {currentlyPlaying, playing, color}
		},
		actions: {
			player: {toggle}
		}
	} = useStore();

	const updatePlaying = useUpdatePlaying();
	const deleteTrack = useDeleteTrack();

	return (
		<Subscription subscription={ON_TRACK_ADDED} variables={{playlist}}>
			{_ => (
				<Queue
					color={color}
					tracks={tracks}
					playing={playing}
					togglePlaying={toggle('playing')}
					updatePlaying={(track: $Track) => {
						// Need to check if it's already playing, otherwise it actually
						// stops playback
						if (!playing) {
							toggle('playing')(true);
						}
						updatePlaying(track);
					}}
					deleteTrack={(track: $Track) => {
						deleteTrack({playlist, trackId: track.id});
						toast(<Toast message="Song Deleted" />);
					}}
					currentlyPlayingId={currentlyPlaying && currentlyPlaying.id}
				/>
			)}
		</Subscription>
	);
}
