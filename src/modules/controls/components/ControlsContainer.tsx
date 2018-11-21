import * as React from 'react';

import { useTogglePlaying } from '../../common/mutations/TogglePlaying';
import useSkipControls from '../../common/mutations/useSkipControls';
import { useStore } from '../../store';
import Controls from './Controls';

export default function ControlsContainer() {
	const {
		state: {
			player: {currentlyPlaying, playing, expanded, played, duration}
		},
		actions: {
			player: {toggle: playerToggle, setter},
			search: {toggle: searchToggle}
		}
	} = useStore();

	const {playNext, playPrev} = useSkipControls();
	const togglePlaying = useTogglePlaying();

	return (
		<Controls
			currentlyPlaying={currentlyPlaying}
			playing={playing}
			played={played}
			duration={duration}
			togglePlaying={togglePlaying}
			expanded={expanded}
			toggleExpanded={playerToggle('expanded')}
			toggleSearch={searchToggle('isSearchOpen')}
			playNext={playNext}
			playPrev={playPrev}
			setPlayed={setter('played')}
		/>
	);
}
