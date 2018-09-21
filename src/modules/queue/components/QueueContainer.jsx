import React from 'react';

import {Mutation, Subscription} from 'react-apollo';
import Queue from './Queue';
import gql from 'graphql-tag';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import SpinnerQuery from '../../common/components/SpinnerQuery';
import {nullToUndefined} from '../../common/utils';
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

const Composed = adapt(
	{
		playlist: <WithPlaylistId />,
		updatePlaying: <Mutation mutation={UPDATE_PLAYING} />
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
				updatePlaying
			}) => (
				<Queue
					tracks={tracks}
					updatePlaying={track => updatePlaying({variables: {track}})}
					currentlyPlayingId={currentlyPlaying && currentlyPlaying.id}
				/>
			)}
		</Composed>
	);
}
