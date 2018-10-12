import React from 'react';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import {PlayNext} from '../../common/mutations/ChangeSong';
import Player from './Player';
import SetDuration from '../../common/mutations/SetDuration';
import SetPlayed from '../../common/mutations/SetPlayed';
import TogglePlaying from '../../common/mutations/TogglePlaying';
import TrackFragments from '../../common/fragments/TrackFragments';
import adapt from '../../common/components/Adapt';

const query = gql`
	query PlayerContainer {
		player @client {
			currentlyPlaying {
				...AllTrack
			}
			playing
			played
			duration
		}
	}
	${TrackFragments.all}
`;

const Composed = adapt({
	playNext: <PlayNext />,
	togglePlaying: <TogglePlaying toggle />,
	setPlayed: <SetPlayed variable="played" />,
	setDuration: <SetDuration variable="duration" />,
	data: ({render}) => <Query query={query}>{({data}) => render(data)}</Query>
});

export default function PlayerContainer() {
	return (
		<Composed>
			{({
				data: {
					player: {currentlyPlaying, playing, played, duration}
				},
				playNext,
				togglePlaying,
				setPlayed,
				setDuration
			}) => (
				<Player
					currentlyPlaying={currentlyPlaying}
					playing={playing}
					played={played}
					duration={duration}
					togglePlaying={togglePlaying}
					playNext={playNext}
					setPlayed={setPlayed}
					setDuration={setDuration}
				/>
			)}
		</Composed>
	);
}
