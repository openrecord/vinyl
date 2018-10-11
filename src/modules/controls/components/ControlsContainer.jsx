import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import PlayNthNextFromQueue from '../mutations/PlayNthNextFromQueue';
import SetDuration from '../mutations/SetDuration';
import SetPlayed from '../mutations/SetPlayed';
import ToggleExpanded from '../mutations/ToggleExpanded';
import TogglePlaying from '../mutations/TogglePlaying';
import TrackFragments from '../../common/fragments/TrackFragments';
import Controls from './Controls';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import adapt from '../../common/components/Adapt';

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
	playNthNextFromQueue: <PlayNthNextFromQueue simple />,
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
				playNthNextFromQueue,
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
					playNext={_ => playNthNextFromQueue({playlist, n: 1})}
					playPrev={_ => playNthNextFromQueue({playlist, n: -1})}
					setPlayed={setPlayed}
					setDuration={setDuration}
				/>
			)}
		</Composed>
	);
}
