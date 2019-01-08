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
import TriButton from './TriButton';

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
    <VelocityTransitionGroup
      enter={{animation: animations.slideUpExpand.in, duration: 400}}
      leave={{animation: animations.slideUpExpand.out}}
    >
      {visible && (
        <Footer bgColor={bgColor}>
          <MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>
        </Footer>
      )}
    </VelocityTransitionGroup>
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
  padding: 0.5rem 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: ${zindex('controls')};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0.25rem 2rem 0.25rem 2rem;

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

  @media ${device.small} {
    max-width: 75%;
  }
`;
