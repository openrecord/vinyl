import React from 'react';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import {PlayNext, PlayPrev} from '../../common/mutations/ChangeSong';
import Controls from './Controls';
import SetDuration from '../../common/mutations/SetDuration';
import SetPlayed from '../../common/mutations/SetPlayed';
import ToggleExpanded from '../../common/mutations/ToggleExpanded';
import TogglePlaying from '../../common/mutations/TogglePlaying';
import TrackFragments from '../../common/fragments/TrackFragments';
import adapt from '../../common/components/Adapt';
import ToggleSearch from '../../common/mutations/ToggleSearch';

const query = gql`
	query ControlsContainer {
		player @client {
			currentlyPlaying {
				...AllTrack
			}
			playing
			expanded
			played
			duration
		}
	}
	${TrackFragments.all}
`;

const Composed = adapt({
	playNext: <PlayNext />,
	playPrev: <PlayPrev />,
	togglePlaying: <TogglePlaying toggle />,
	toggleExpanded: <ToggleExpanded toggle />,
	toggleSearch: <ToggleSearch nullary />,
	setPlayed: <SetPlayed variable="played" />,
	setDuration: <SetDuration variable="duration" />,
	data: ({render}) => <Query query={query}>{({data}) => render(data)}</Query>
});

export default function ControlsContainer() {
	return (
		<Composed>
			{({
				data: {
					player: {currentlyPlaying, playing, expanded, played, duration}
				},
				playNext,
				playPrev,
				toggleExpanded,
				togglePlaying,
				toggleSearch,
				setPlayed,
				setDuration
			}) => (
				<Controls
					currentlyPlaying={currentlyPlaying}
					playing={playing}
					played={played}
					duration={duration}
					togglePlaying={togglePlaying}
					expanded={expanded}
					toggleExpanded={toggleExpanded}
					toggleSearch={toggleSearch}
					playNext={playNext}
					playPrev={playPrev}
					setPlayed={setPlayed}
					setDuration={setDuration}
				/>
			)}
		</Composed>
	);
}
