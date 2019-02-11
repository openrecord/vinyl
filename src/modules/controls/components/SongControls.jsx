import * as React from 'react';
import styled, {css} from 'styled-components';
import nextImg from './images/next-arrow.svg';
import prevImg from './images/prev-arrow.svg';

import PlayPause from '../../common/components/PlayPause';

const left = {
  margin: '0 1.5rem 0 0'
};

const right = {
  margin: '0 0 0 1.5rem'
};

export default function SongControls({playing, playPrev, playNext, togglePlaying}) {
  return (
    <StyledControls>
      <Arrow style={left} onClick={playPrev} src={prevImg} />
      <PlayPauseHolder onClick={togglePlaying}>
        <PlayPause play={!playing} />
      </PlayPauseHolder>
      <Arrow style={right} onClick={playNext} src={nextImg} />
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
  opacity: 0.9;
  position: relative;
  transition: all 0.1s;
  width: 1rem;

  :hover {
    opacity: 1;
  }
`;

const PlayPauseHolder = styled.div`
  cursor: pointer;
  position: relative;
  height: 1.125rem;
  margin-right: -0.325rem;
  padding: 0.5rem;
  opacity: 0.9;
  transition: all 0.1s;
  width: 1.125rem;

  svg {
    fill: white;
    position: relative;
  }

  :hover {
    opacity: 1;
  }
`;
