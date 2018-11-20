import * as React from 'react';

import adapt from '../../common/components/Adapt';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import { PlayNext } from '../../common/mutations/ChangeSong';
import { useStore } from '../../store';
import OnRemoteControl from '../subscriptions/OnRemoteControl';
import PlayerBox from './PlayerBox';

const Composed = adapt({
	playNext: <PlayNext />,
	playlist: <WithPlaylistId />
});

interface $Props {
	playlist: string;
	playNext(): void;
}
export default function PlayerContainer() {
	const {
		state: {
			player: {currentlyPlaying, playing, played, duration, expanded, live}
		},
		actions: {
			player: {toggle, setter}
		}
	} = useStore();

	return (
		<Composed>
			{({playNext, playlist}: $Props) => (
				<OnRemoteControl playlist={playlist} currentlyPlaying={currentlyPlaying} live={live}>
					{() => (
						<PlayerBox
							expanded={expanded}
							currentlyPlaying={currentlyPlaying}
							playing={playing}
							played={played}
							duration={duration}
							toggleExpanded={toggle('expanded')}
							togglePlaying={toggle('playing')}
							playNext={playNext}
							setPlayed={setter('played')}
							setDuration={setter('duration')}
						/>
					)}
				</OnRemoteControl>
			)}
		</Composed>
	);
}
