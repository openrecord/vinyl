import * as Color from 'color';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import {device} from '../../../styles/utilities/device';
import animate from '../../common/animate';
import * as animations from '../../common/animations';
import {ifElse} from '../../common/utils';
import zindex from '../../common/zindex';
import {$Track} from '../../search/components/types';
import {$Color} from '../../store';
import ScrollButton from './ScrollButton';
import Slider from './Slider';
import SongControls from './SongControls';

interface $Props {
  bgColor: $Color;
  playing: boolean;
  togglePlaying(): void;
  toggleSearch(): void;
  playNext(): void;
  playPrev(): void;
  played: number;
  duration: number;
  currentlyPlaying: $Track | undefined;
  setPlayed(played: number): void;
  isActive: boolean;
  arrowDown: boolean;
}

export default function Controls({
  bgColor,
  playing,
  togglePlaying,
  playNext,
  playPrev,
  played,
  duration,
  currentlyPlaying,
  setPlayed,
  isActive,
  arrowDown
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

  const expand = <ScrollButton arrowDown={arrowDown} onClick={scroller(arrowDown)} />;

  const desktop = (
    <Footer bgColor={bgColor}>
      <Slider played={played} duration={duration} setPlayed={setPlayed} />
      <Row>
        {title}
        {controls}
        {expand}
      </Row>
    </Footer>
  );

  const mobile = (
    <Footer bgColor={bgColor}>
      {currentlyPlaying && (
        <Row>
          {title}
          {expand}
        </Row>
      )}
      <Row>{controls}</Row>
    </Footer>
  );

  return (
    <VelocityTransitionGroup
      enter={{animation: animations.slideUpExpand.in, duration: 400}}
      leave={{animation: animations.slideUpExpand.out}}
    >
      {currentlyPlaying &&
        isActive && <MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>}
    </VelocityTransitionGroup>
  );
}

function scroller(scrollDown: boolean) {
  return () =>
    animate('scroll', {easing: 'ease-in-out', duration: 750}).on(
      `[data-id="${scrollDown ? 'queue' : 'player'}"]`
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
