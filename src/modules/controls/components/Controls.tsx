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
import ExpandSwitch from '../../common/components/ExpandSwitch';

interface $Props {
  bgColor: $Color;
  playing: boolean;
  expanded: boolean;
  muted: boolean;
  togglePlaying(): void;
  toggleExpanded(): void;
  toggleMuted(): void;
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
  muted,
  expanded,
  togglePlaying,
  toggleMuted,
  toggleExpanded,
  playNext,
  playPrev,
  currentlyPlaying,
  visible
}: $Props) {
  const controls = (
    <MediaControls expanded={expanded}>
      <SoundToggle onClick={toggleMuted}>
        <SoundSwitch muted={muted} />
      </SoundToggle>
      <SongControls
        playing={playing}
        togglePlaying={togglePlaying}
        playNext={playNext}
        playPrev={playPrev}
      />
      <ExpandToggle onClick={toggleExpanded}>
        <ExpandSwitch expanded={expanded} />
      </ExpandToggle>
    </MediaControls>
  );

  const desktop = (
    <Row>
      {currentlyPlaying && <Title expanded={expanded}>{currentlyPlaying.info.title}</Title>}
      {controls}
    </Row>
  );

  const mobile = (
    <>
      <Row>
        {currentlyPlaying && <Title expanded={expanded}>{currentlyPlaying.info.title}</Title>}
        {controls}
      </Row>
    </>
  );

  return (
    <ControlBar visible={visible} expanded={expanded}>
      <MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>
    </ControlBar>
  );
}

interface $IsExpanded {
  expanded: boolean;
}

interface $IsVisible {
  visible: boolean;
}

const ControlBar = styled.div`
  display: block;
  opacity: ${(props: $IsVisible) => (props.visible ? '1' : '0')};
  padding: ${(props: $IsExpanded) => (props.expanded ? '0.5rem 0' : '0.25rem 0')};
  position: ${(props: $IsExpanded) => (props.expanded ? 'relative' : 'fixed')};
  top: ${(props: $IsExpanded) => (props.expanded ? '100%' : 'auto')};
  bottom: ${(props: $IsExpanded) => (props.expanded ? 'auto' : '0')};
  transition: all 0.1s;
  width: 100%;
  z-index: ${zindex('controls')};

  @media ${device.medium} {
    bottom: auto;
    opacity: 1;
    padding: 0.5rem 0;
    position: relative;
    top: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  @media ${device.medium} {
    flex-direction: column;
  }
`;

const SoundToggle = styled.button`
  background: transparent;
  color: white;
  cursor: pointer;
  height: 2.25rem;
  padding: 0.5rem;
  opacity: 0.9;
  transition: all 0.1s;
  width: 2.5rem;

  :hover {
    opacity: 1;
  }
`;

const MediaControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  padding: ${(props: $IsExpanded) => (props.expanded ? '0' : '0 0.5rem')};

  @media ${device.medium} {
    width: ${(props: $IsExpanded) => (props.expanded ? '100%' : '95%')};
  }
`;

const ExpandToggle = styled.button`
  box-sizing: content-box;
  cursor: pointer;
  height: 1.5rem;
  padding: 0.5rem;
  opacity: 0.9;
  transition: all 0.1s;
  width: 1.5rem;

  :hover {
    opacity: 1;
  }
`;

const Title = styled.h4`
  color: rgb(255, 255, 255);
  display: none;
  margin: 1rem 0;
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${device.medium} {
    display: block;
  }
`;
