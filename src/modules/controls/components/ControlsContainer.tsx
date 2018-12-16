import * as React from 'react';

import {useTogglePlaying} from '../../common/mutations/TogglePlaying';
import useSkipControls from '../../common/mutations/useSkipControls';
import {useStore} from '../../store';
import useKeyboardControls from '../hooks/useKeyboardControls';
import useQueueBelowMidScreen from '../hooks/useQueueBelowMidScreen';
import Controls from './Controls';

export default function ControlsContainer() {
  const {
    state: {
      player: {currentlyPlaying, playing, played, duration, color, isActive}
    },
    actions: {
      player: {setter},
      search: {toggle: searchToggle}
    }
  } = useStore();

  const {playNext, playPrev} = useSkipControls();
  const togglePlaying = useTogglePlaying();
  const toggleSearch = searchToggle('isOpen');
  const belowHalfway = useQueueBelowMidScreen();

  useKeyboardControls({toggleSearch, togglePlaying});

  return (
    <Controls
      bgColor={color}
      currentlyPlaying={currentlyPlaying}
      playing={playing}
      played={played}
      duration={duration}
      togglePlaying={togglePlaying}
      toggleSearch={toggleSearch}
      playNext={playNext}
      playPrev={playPrev}
      setPlayed={setter('played')}
      isActive={isActive}
      arrowDown={belowHalfway}
    />
  );
}
