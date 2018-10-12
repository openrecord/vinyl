import React from 'react';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import SetDuration from '../../common/mutations/SetDuration';
import SetPlayed from '../../common/mutations/SetPlayed';
import ToggleExpanded from '../mutations/ToggleExpanded';
import TogglePlaying from '../../common/mutations/TogglePlaying';
import TrackFragments from '../../common/fragments/TrackFragments';
import Controls from './Controls';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import adapt from '../../common/components/Adapt';
import {PlayNext, PlayPrev} from '../../common/mutations/ChangeSong';

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
	setPlayed: <SetPlayed variable="played" />,
	setDuration: <SetDuration variable="duration" />,
	data: ({render}) => <Query query={query}>{({data}) => render(data)}</Query>,
	playlist: <WithPlaylistId />
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
				setPlayed,
				setDuration,
				playlist
			}) => (
				<Controls
					currentlyPlaying={currentlyPlaying}
					playing={playing}
					played={played}
					duration={duration}
					togglePlaying={togglePlaying}
					expanded={expanded}
					toggleExpanded={toggleExpanded}
					playNext={playNext}
					playPrev={playPrev}
					setPlayed={setPlayed}
					setDuration={setDuration}
				/>
			)}
		</Composed>
	);
}
