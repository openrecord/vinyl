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
import Slider from './Slider';
import SongControls from './SongControls';
import TriButton from './TriButton';

interface $Props {
  bgColor: $Color;
  playing: boolean;
  togglePlaying(): void;
  expanded: boolean;
  toggleExpanded(): void;
  toggleSearch(): void;
  playNext(): void;
  playPrev(): void;
  played: number;
  currentlyPlaying: $Track | undefined;
  setPlayed(played: number): void;
  isActive: boolean;
}

export default function Controls({
  bgColor,
  playing,
  togglePlaying,
  expanded,
  toggleExpanded,
  playNext,
  playPrev,
  played,
  currentlyPlaying,
  setPlayed,
  isActive
}: $Props) {
  const title = currentlyPlaying && <Title>{currentlyPlaying.info.title}</Title>;

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

  const minimize = <TriButton up={!expanded} onClick={toggleExpanded} />;

  const desktop = (
    <Row>
      {title}
      {controls}
      {minimize}
    </Row>
  );

  const mobile = (
    <>
      {currentlyPlaying && (
        <Row>
          {title}
          {minimize}
        </Row>
      )}
      <Row>{controls}</Row>
    </>
  );

  return (
    <Footer bgColor={bgColor}>
      <Slider played={played} setPlayed={setPlayed} />
      <VelocityTransitionGroup
        enter={{animation: animations.slideUpExpand.in, duration: 400}}
        leave={{animation: animations.slideUpExpand.out}}
      >
        {currentlyPlaying && isActive && (
          <MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>
        )}
      </VelocityTransitionGroup>
    </Footer>
  );
}

interface $BgColor {
  bgColor: $Color;
}

const Footer = styled.div`
  background-color: ${(props: $BgColor) =>
    Color(props.bgColor)
      .rgb()
      .string()};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: ${zindex('controls')};
  @media ${device.small} {
    height: 9rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0.25rem 2rem 1rem 2rem;

  :first-child {
    border-top: none;
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

const Title = styled.h5`
  color: rgb(255, 255, 255);
  max-width: 25%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
