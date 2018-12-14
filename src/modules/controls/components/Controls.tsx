import * as Color from 'color';
import * as _ from 'lodash';
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
import ExpandButton from './ExpandButton';
import KeyboardControls from './KeyboardControls';
import Slider from './Slider';
import SongControls from './SongControls';

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
  duration: number;
  currentlyPlaying: $Track | undefined;
  setPlayed(played: number): void;
}

export default function Controls({
  bgColor,
  playing,
  expanded,
  togglePlaying,
  toggleExpanded,
  toggleSearch,
  playNext,
  playPrev,
  played,
  duration,
  currentlyPlaying,
  setPlayed
}: $Props) {
  const isHidden = useHideOnMouseIdle();
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

  const expandButton = expanded && (
    <RightCenter onClick={toggleExpanded}>
      <ExpandButton />
    </RightCenter>
  );

  const desktop = (
    <Footer bgColor={bgColor}>
      <Slider played={played} duration={duration} setPlayed={setPlayed} />
      <Row>
        {title}
        {controls}
        {expandButton}
      </Row>
    </Footer>
  );

  const mobile = (
    <Footer bgColor={bgColor}>
      {currentlyPlaying && (
        <Row>
          {title}
          <ExpandButton />
        </Row>
      )}
      <Row>{controls}</Row>
    </Footer>
  );

  return (
    <KeyboardControls
      isPlayerOpen={!!currentlyPlaying}
      togglePlaying={togglePlaying}
      toggleExpanded={toggleExpanded}
      toggleSearch={toggleSearch}
    >
      <VelocityTransitionGroup
        enter={{animation: animations.slideUpExpand.in, duration: 400}}
        leave={{animation: animations.slideUpExpand.out}}
      >
        {currentlyPlaying && !isHidden && (
          <MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>
        )}
      </VelocityTransitionGroup>
    </KeyboardControls>
  );
}

function useHideOnMouseIdle() {
  const [isHidden, setIsHidden] = React.useState(false);
  const pid = React.useRef(0);

  const setTimer = () => {
    pid.current = window.setTimeout(() => setIsHidden(true), 3000);
  };

  const reset = React.useRef(
    _.throttle(() => {
      setIsHidden(false);
      clearTimeout(pid.current);
      setTimer();
    }, 250)
  );

  React.useEffect(() => {
    setTimer();
    document.addEventListener('mousemove', reset.current);
    document.addEventListener('keypress', reset.current);

    return () => {
      document.removeEventListener('mousemove', reset.current);
      document.removeEventListener('keypress', reset.current);
    };
  }, []);

  return isHidden;
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

const RightCenter = styled.div`
  cursor: pointer;

  :hover {
    ${ExpandButton} {
      opacity: 1;
    }
  }
`;
