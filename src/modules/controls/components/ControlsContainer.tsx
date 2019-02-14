import * as React from 'react';

import {useTogglePlaying} from '../../common/mutations/TogglePlaying';
import useSkipControls from '../../common/mutations/useSkipControls';
import {useStore} from '../../store';
import useKeyboardControls from '../hooks/useKeyboardControls';
import Controls from './Controls';

export default function ControlsContainer() {
  const {
    state: {
      player: {currentlyPlaying, playing, expanded, muted, played, color, isActive}
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
      played={played}
      togglePlaying={togglePlaying}
      expanded={expanded}
      muted={muted}
      toggleMuted={playerActions.toggle('muted')}
      toggleExpanded={playerActions.toggle('expanded')}
      toggleSearch={toggleSearch}
      playNext={playNext}
      playPrev={playPrev}
      setPlayed={playerActions.setter('played')}
      visible={!!currentlyPlaying && isActive}
    />
  );
}
