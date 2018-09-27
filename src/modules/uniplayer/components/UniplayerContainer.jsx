import React from 'react';

import Uniplayer from './Uniplayer.jsx';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import TrackFragments from '../../common/fragments/TrackFragments';
import adapt from '../../common/components/Adapt';

const query = gql`
	query UniplayerContainer {
		player @client {
			currentlyPlaying {
				...AllTrack
			}
		}
	}
	${TrackFragments.all}
`;

const PLAY_NTH_NEXT_FROM_QUEUE = gql`
	mutation playNthNextFromQueue($playlist: String!, $n: Integer!) {
		playNthNextFromQueue(playlist: $playlist, n: $n) @client
	}
`;

const Composed = adapt({
	playNthNextFromQueue: <Mutation mutation={PLAY_NTH_NEXT_FROM_QUEUE} />,
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
				playNthNextFromQueue,
				playlist
			}) => (
				<Uniplayer
					currentlyPlaying={currentlyPlaying}
					playNext={_ => playNthNextFromQueue({variables: {playlist, n: 1}})}
					playPrev={_ => playNthNextFromQueue({variables: {playlist, n: -1}})}
				/>
			)}
		</Composed>
	);
}
