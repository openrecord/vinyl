import React from 'react';

import Uniplayer from './Uniplayer.jsx';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import TrackFragments from '../../common/fragments/TrackFragments';
import adapt from '../../common/components/Adapt';

const query = gql`
	query UniplayerContainer($playlist: String!) {
		player @client {
			currentlyPlaying {
				...AllTrack
			}
		}
	}
	${TrackFragments.all}
`;

const PLAY_NEXT_FROM_QUEUE = gql`
	mutation playNextFromQueue($playlist: String!) {
		playNextFromQueue(playlist: $playlist) @client
	}
`;

const Composed = adapt({
	playNextFromQueue: <Mutation mutation={PLAY_NEXT_FROM_QUEUE} />,
	data: ({render}) => <Query query={query}>{({data}) => render(data)}</Query>,
	playlist: <WithPlaylistId />
});

export default function UniplayerContainer() {
	return (
		<Composed>
			{({
				data: {
					player: {currentlyPlaying}
				},
				playNextFromQueue,
				playlist
			}) => (
				<Uniplayer
					currentlyPlaying={currentlyPlaying}
					playNextFromQueue={() => playNextFromQueue({variables: {playlist}})}
				/>
			)}
		</Composed>
	);
}
