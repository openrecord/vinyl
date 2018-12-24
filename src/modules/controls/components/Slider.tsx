import ReactSlider from 'rc-slider';
import * as React from 'react';
import styled from 'styled-components';

interface $Props {
  played: number;
  setPlayed(played: number): void;
}

export default function Slider({played, setPlayed}: $Props) {
  return (
    <SliderContainer>
      <StyledReactSlider
        min={0}
        max={1}
        value={played}
        step={0.001}
        onChange={setPlayed}
        handleStyle={{
          background: 'white',
          borderRadius: '50%',
          height: '0.75rem',
          width: '0.75rem',
          position: 'relative',
          transform: 'translate(-50%, -50%) scale(0)',
          top: '-50%',
          transition: 'transform 0.5s ease-in-out, left 1s linear'
        }}
      />
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  display: none;
  cursor: pointer;
  padding: 0.75rem 2rem;

  :hover {
    .rc-slider-track {
      background: rgb(156, 77, 157);
    }

    .rc-slider-handle {
      transform: translate(-50%, -50%) scale(1) !important;
    }
  }
`;

export const StyledReactSlider = styled(ReactSlider)`
  background: rgba(255, 255, 255, 0.35);

  .rc-slider-handle:focus {
    outline: 0;
  }

  .rc-slider-track {
    background: rgba(255, 255, 255, 0.6);
    transition: background-color 0.3s linear, width 1s linear;
  }

  &,
  .rc-slider-track {
    height: 0.25rem;
    border-radius: 0.5rem;
  }
`;
