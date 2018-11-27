import * as React from 'react';

import usePlaylistName from '../../common/hooks/usePlaylistName';
import {useTogglePlaying} from '../../common/mutations/TogglePlaying';
import useSkipControls from '../../common/mutations/useSkipControls';
import {useStore} from '../../store';
import OnRemoteControl from '../subscriptions/OnRemoteControl';
import PlayerBox from './PlayerBox';

export default function PlayerContainer() {
	const playlist = usePlaylistName();
	const {
		state: {
			player: {currentlyPlaying, playing, played, duration, expanded, live}
		},
		actions: {
			player: {toggle, setter}
		}
	} = useStore();

	const {playNext} = useSkipControls();
	const togglePlaying = useTogglePlaying();

	return (
		<OnRemoteControl playlist={playlist} currentlyPlaying={currentlyPlaying} live={live}>
			{() => (
				<PlayerBox
					expanded={expanded}
					currentlyPlaying={currentlyPlaying}
					playing={playing}
					played={played}
					duration={duration}
					toggleExpanded={() => toggle('expanded')()}
					togglePlaying={togglePlaying}
					playNext={playNext}
					setPlayed={setter('played')}
					setDuration={setter('duration')}
				/>
			)}
		</OnRemoteControl>
	);
}
