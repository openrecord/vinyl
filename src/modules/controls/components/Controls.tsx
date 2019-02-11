import * as Color from 'color';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import {device} from '../../../styles/utilities/device';
import * as animations from '../../common/animations';
import {ifElse} from '../../common/utils';
import zindex from '../../common/zindex';
import {$Track} from '../../search/components/types';
import {$Color} from '../../store';
import SongControls from './SongControls';
import SoundSwitch from '../../common/components/SoundSwitch';

interface $Props {
  bgColor: $Color;
  playing: boolean;
  expanded: boolean;
  togglePlaying(): void;
  toggleExpanded(): void;
  toggleSearch(): void;
  playNext(): void;
  playPrev(): void;
  played: number;
  currentlyPlaying: $Track | undefined;
  setPlayed(played: number): void;
  visible: boolean;
}

export default function Controls({
  bgColor,
  playing,
  expanded,
  togglePlaying,
  toggleExpanded,
  playNext,
  playPrev,
  currentlyPlaying,
  visible
}: $Props) {
  const controls = (
    <MediaControls>
      <SongControls
        playing={playing}
        togglePlaying={togglePlaying}
        playNext={playNext}
        playPrev={playPrev}
      />
    </MediaControls>
  );

  const desktop = (
    <Row>
      <SoundToggle onClick={toggleExpanded}>
        <SoundSwitch expanded={!expanded} />
      </SoundToggle>
      {controls}
    </Row>
  );

  const mobile = (
    <>
      <Row>
        <SoundToggle onClick={toggleExpanded} expanded={expanded}>
          <SoundSwitch expanded={!expanded} />
        </SoundToggle>
        {controls}
      </Row>
    </>
  );

  return (
    <ControlBar visible={visible}>
      <MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>
    </ControlBar>
  );
}

interface $IsVisible {
  visible: boolean;
}

const ControlBar = styled.div`
  display: block;
  opacity: ${(props: $IsVisible) => (props.visible ? '1' : '0')};
  padding: 0.5rem 0;
  position: relative;
  top: 100%;
  transition: all 0.1s;
  width: 100%;
  z-index: ${zindex('controls')};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  :first-child {
    border-top: none;
  }

  @media ${device.small} {
    height: 2.25rem;
  }
`;

const SoundToggle = styled.button`
  background: transparent;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  opacity: 0.9;
  transition: all 0.1s;

  :hover {
    opacity: 1;
  }
`;

const MediaControls = styled.div`
  left: 50%;
  min-width: 40%;
  position: absolute;
  transform: translateX(-50%);

  @media ${device.small} {
    width: 100%;
  }
`;
