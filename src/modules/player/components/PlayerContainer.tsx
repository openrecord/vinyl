import gql from 'graphql-tag';
import * as React from 'react';
import {Query} from 'react-apollo';

import adapt from '../../common/components/Adapt';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import TrackFragments from '../../common/fragments/TrackFragments';
import {PlayNext} from '../../common/mutations/ChangeSong';
import {useSetDuration} from '../../common/mutations/SetDuration';
import {useSetPlayed} from '../../common/mutations/SetPlayed';
import {useToggleExpanded} from '../../common/mutations/ToggleExpanded';
import {useTogglePlaying} from '../../common/mutations/TogglePlaying';
import {$Track} from '../../search/components/types';
import OnRemoteControl from '../subscriptions/OnRemoteControl';
import PlayerBox from './PlayerBox';

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
			live
		}
	}
	${TrackFragments.all}
`;
interface $QueryData {
	player: {
		currentlyPlaying: $Track | null;
		playing: boolean;
		played: number;
		duration: number;
		expanded: boolean;
		live: boolean;
	};
}

interface $Renderer {
	render(args?: any): JSX.Element;
}

const Composed = adapt(
	{
		playNext: <PlayNext />,
		playlist: <WithPlaylistId />,
		data: ({render}: $Renderer) => <Query query={query}>{({data}) => render(data)}</Query>
	},
	{
		_: ({render, playlist, data}: $Renderer & $Props & $QueryData) => (
			<OnRemoteControl
				playlist={playlist}
				currentlyPlaying={data && data.player && data.player.currentlyPlaying}
				live={data.player.live}
			>
				{render}
			</OnRemoteControl>
		)
	}
);

interface $Props {
	data: $QueryData;
	playlist: string;
	playNext(): void;
}
export default function PlayerContainer() {
	const toggleExpanded = useToggleExpanded();
	const setPlayed = useSetPlayed();
	const setDuration = useSetDuration();
	const togglePlaying = useTogglePlaying();

	return (
		<Composed>
			{({
				data: {
					player: {currentlyPlaying, playing, played, duration, expanded}
				},
				playNext
			}: $Props) => (
				<PlayerBox
					expanded={expanded}
					currentlyPlaying={currentlyPlaying}
					playing={playing}
					played={played}
					duration={duration}
					toggleExpanded={toggleExpanded}
					togglePlaying={togglePlaying}
					playNext={playNext}
					setPlayed={setPlayed}
					setDuration={setDuration}
				/>
			)}
		</Composed>
	);
}
