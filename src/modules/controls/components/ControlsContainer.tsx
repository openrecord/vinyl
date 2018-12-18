import * as React from 'react';

import {useTogglePlaying} from '../../common/mutations/TogglePlaying';
import useSkipControls from '../../common/mutations/useSkipControls';
import {useStore} from '../../store';
import useKeyboardControls from '../hooks/useKeyboardControls';
import Controls from './Controls';

export default function ControlsContainer() {
  const {
    state: {
      player: {currentlyPlaying, playing, expanded, played, color, isActive}
    },
    actions: {player: playerActions, search: searchActions}
  } = useStore();

  const {playNext, playPrev} = useSkipControls();
  const togglePlaying = useTogglePlaying();
  const toggleSearch = searchActions.toggle('isOpen');

  useKeyboardControls({toggleSearch, togglePlaying});

  return (
    <Controls
      bgColor={color}
      currentlyPlaying={currentlyPlaying}
      playing={playing}
      expanded={expanded}
      toggleExpanded={playerActions.toggle('expanded')}
      played={played}
      togglePlaying={togglePlaying}
      toggleSearch={toggleSearch}
      playNext={playNext}
      playPrev={playPrev}
      setPlayed={playerActions.setter('played')}
      isActive={isActive}
    />
  );
}
