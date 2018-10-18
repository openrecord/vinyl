import * as React from 'react';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import {PlayNext} from '../../common/mutations/ChangeSong';
import PlayerBox from './PlayerBox';
import SetDuration from '../../common/mutations/SetDuration';
import SetPlayed from '../../common/mutations/SetPlayed';
import TogglePlaying from '../../common/mutations/TogglePlaying';
import ToggleExpanded from '../../common/mutations/ToggleExpanded';
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
			expanded
		}
	}
	${TrackFragments.all}
`;

const Composed = adapt({
	playNext: <PlayNext />,
	toggleExpanded: <ToggleExpanded toggle="maybeValue" />,
	setPlayed: <SetPlayed variable="played" />,
	setDuration: <SetDuration variable="duration" />,
	data: ({render}) => <Query query={query}>{({data}) => render(data)}</Query>
});

export default function PlayerContainer() {
	return (
		<Composed>
			{({
				data: {
					player: {currentlyPlaying, playing, played, duration, expanded}
				},
				playNext,
				toggleExpanded,
				setPlayed,
				setDuration
			}) => (
				<PlayerBox
					expanded={expanded}
					currentlyPlaying={currentlyPlaying}
					playing={playing}
					played={played}
					duration={duration}
					toggleExpanded={toggleExpanded}
					playNext={playNext}
					setPlayed={setPlayed}
					setDuration={setDuration}
				/>
			)}
		</Composed>
	);
}
