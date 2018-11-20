import * as React from 'react';

import adapt from '../../common/components/Adapt';
import { PlayNext, PlayPrev } from '../../common/mutations/ChangeSong';
import ToggleSearch from '../../common/mutations/ToggleSearch';
import { useStore } from '../../store';
import Controls from './Controls';

const Composed = adapt({
	playNext: <PlayNext />,
	playPrev: <PlayPrev />,
	toggleSearch: <ToggleSearch toggle="isOpen" />
});

interface $Props {
	playNext(): void;
	playPrev(): void;
	toggleSearch(isOpen?: boolean): void;
}

export default function ControlsContainer() {
	const {
		state: {
			player: {currentlyPlaying, playing, expanded, played, duration}
		},
		actions: {
			player: {toggle, setter}
		}
	} = useStore();

	return (
		<Composed>
			{({playNext, playPrev, toggleSearch}: $Props) => (
				<Controls
					currentlyPlaying={currentlyPlaying}
					playing={playing}
					played={played}
					duration={duration}
					togglePlaying={toggle('playing')}
					expanded={expanded}
					toggleExpanded={toggle('expanded')}
					toggleSearch={toggleSearch}
					playNext={playNext}
					playPrev={playPrev}
					setPlayed={setter('played')}
				/>
			)}
		</Composed>
	);
}
