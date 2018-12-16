import * as React from 'react';
import styled, {css} from 'styled-components';
import nextImg from './images/next-arrow.svg';
import prevImg from './images/prev-arrow.svg';

import PlayPause from '../../common/components/PlayPause';

export default function SongControls({playing, playPrev, playNext, togglePlaying}) {
  return (
    <StyledControls>
      <Arrow onClick={playPrev} src={prevImg} />
      <PlayPauseHolder onClick={togglePlaying}>
        <PlayPause play={!playing} />
      </PlayPauseHolder>
      <Arrow onClick={playNext} src={nextImg} />
    </StyledControls>
  );
}

const StyledControls = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled.img`
  cursor: pointer;
  display: inline-block;
  height: 1rem;
  margin: 0 2rem;
  padding: 0.5rem;
  position: relative;
  width: 1rem;
`;

const PlayPauseHolder = styled.div`
  cursor: pointer;
  position: relative;
  height: 1.125rem;
  margin-right: -0.325rem;
  padding: 0.5rem;
  width: 1.125rem;

  svg {
    fill: white;
    position: relative;
  }
`;
