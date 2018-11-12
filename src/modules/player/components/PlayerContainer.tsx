import gql from 'graphql-tag';
import * as React from 'react';
import {Query} from 'react-apollo';

import adapt from '../../common/components/Adapt';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import TrackFragments from '../../common/fragments/TrackFragments';
import {PlayNext} from '../../common/mutations/ChangeSong';
import SetDuration from '../../common/mutations/SetDuration';
import SetPlayed from '../../common/mutations/SetPlayed';
import ToggleExpanded from '../../common/mutations/ToggleExpanded';
import TogglePlaying from '../../common/mutations/TogglePlaying';
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
		toggleExpanded: <ToggleExpanded toggle="maybeValue" />,
		togglePlaying: <TogglePlaying />,
		setPlayed: <SetPlayed variable="played" />,
		setDuration: <SetDuration variable="duration" />,
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
	toggleExpanded(): void;
	togglePlaying(): void;
	setPlayed(played: number): void;
	setDuration(duration: number): void;
}
export default function PlayerContainer() {
	return (
		<Composed>
			{({
				data: {
					player: {currentlyPlaying, playing, played, duration, expanded}
				},
				playNext,
				toggleExpanded,
				togglePlaying,
				setPlayed,
				setDuration
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
