import {toast} from 'react-toastify';
import React from 'react';

import {Mutation, Subscription} from 'react-apollo';
import gql from 'graphql-tag';

import {nullToUndefined} from '../../common/utils';
import Queue from './Queue';
import SpinnerQuery from '../../common/components/SpinnerQuery';
import Toast from '../../common/components/Toast';
import TrackFragments from '../../common/fragments/TrackFragments';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import adapt from '../../common/components/Adapt';
import PlaylistFragments from '../../common/fragments/PlaylistFragments';

const query = gql`
	query Queue($playlist: String!) {
		playlist(where: {name: $playlist}) {
			...AllPlaylist
		}

		player @client {
			currentlyPlaying {
				id
			}
		}
	}
	${PlaylistFragments.all}
`;

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

const UPDATE_PLAYING = gql`
	mutation UpdatePlaying($track: Track!) {
		updatePlaying(track: $track) @client
	}
`;

const DELETE_TRACK = gql`
	mutation DeleteTrack($playlist: String!, $trackId: ID!) {
		updatePlaylist(where: {name: $playlist}, data: {tracks: {delete: [{id: $trackId}]}}) {
			id
			tracks {
				id
			}
		}
	}
`;

const Composed = adapt(
	{
		playlist: <WithPlaylistId />,
		updatePlaying: <Mutation mutation={UPDATE_PLAYING} />,
		deleteTrack: <Mutation mutation={DELETE_TRACK} />
	},
	{
		_: ({render, playlist}) => (
			<Subscription subscription={ON_TRACK_ADDED} variables={{playlist}}>
				{render}
			</Subscription>
		),
		data: ({render, playlist}) => (
			<SpinnerQuery query={query} variables={{playlist}} postProcess={nullToUndefined}>
				{({data}) => render(data)}
			</SpinnerQuery>
		)
	}
);

export default function QueueContainer() {
	return (
		<Composed>
			{({
				data: {
					playlist: {tracks} = {tracks: []},
					player: {currentlyPlaying}
				},
				playlist,
				updatePlaying,
				deleteTrack
			}) => (
				<Queue
					tracks={tracks}
					updatePlaying={track => updatePlaying({variables: {track}})}
					deleteTrack={track => {
						deleteTrack({variables: {playlist, trackId: track.id}});
						toast(<Toast message="Song Deleted" />);
					}}
					currentlyPlayingId={currentlyPlaying && currentlyPlaying.id}
				/>
			)}
		</Composed>
	);
}
