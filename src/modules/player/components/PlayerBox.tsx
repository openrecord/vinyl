import * as React from 'react';
import styled, {css} from 'styled-components';

import {device} from '../../../styles/utilities/device';
import zindex from '../../common/zindex';
import {$Track} from '../../search/components/types';
import Player, {$PlayerProps} from './Player';
import ControlsContainer from '../../controls/components/ControlsContainer';

interface $Props {
  currentlyPlaying: $Track | undefined;
  expanded: boolean;
  togglePlaying(): void;
  visible: boolean;
}

export default function PlayerBox({
  currentlyPlaying,
  expanded,
  togglePlaying,
  visible,
  ...props
}: $Props & $PlayerProps) {
  if (!currentlyPlaying) {
    return null;
  }
  const title = currentlyPlaying && <Title visible={visible}>{currentlyPlaying.info.title}</Title>;

  const isSoundCloud = currentlyPlaying.info.source === 'SOUNDCLOUD';
  const art = getTrackThumbnail(currentlyPlaying);
  return (
    <Positioning data-id="player">
      {title}
      <PlayerHolder>
        <SizingHack isSoundCloud={isSoundCloud}>
          <IFrameBlocker />
          <HiddenPlayToggle visible={visible} onClick={togglePlaying} />
          {isSoundCloud && art && <SoundCloudArt src={art} />}
          <Player currentlyPlaying={currentlyPlaying!} {...props} />
        </SizingHack>
        <ControlsContainer />
      </PlayerHolder>
    </Positioning>
  );
}

function getTrackThumbnail(track: $Track) {
  var trackID;
  if (track.info.thumbnail !== null) {
    trackID = track.info.thumbnail.split('large.jpg')[0];
    if (track.info.source === 'SOUNDCLOUD') {
      return '' + trackID + 't500x500.jpg';
    }
  }
  return '';
}

interface $IsExpanded {
  expanded: boolean;
}

interface $IsSoundCloud {
  isSoundCloud: boolean;
}

interface $IsVisible {
  visible: boolean;
}

const Positioning = styled.div`
  position: relative;
  margin: 0 2rem;
  width: 80%;
  height: 100vh;
  z-index: ${zindex('player')};
  overflow: hidden;
  transition: all linear 0.3s;
  background-color: transparent;

  [data-style-id='react-player'] > div {
    height: 250% !important;
    transform: translateY(-30%);
  }
`;

const SoundCloudArt = styled.img`
  height: 100%;
  width: 56.25%;
  position: absolute;
  overflow: hidden;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  max-height: 40rem;
`;

// const NoArtwork = styled.div`
//   background-image: linear-gradient(135deg, #846170, #e6846e);
// `;

const IFrameBlocker = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: ${zindex('iframeblocker')};
  transition: all linear 0.3s;
`;

const HiddenPlayToggle = styled.div`
  cursor: pointer;
  display: ${(props: $IsVisible) => (props.visible ? 'block' : 'none')};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: ${zindex('hiddenplaytoggle')};
  transition: all linear 0.3s;
`;

const PlayerHolder = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const SizingHack = styled.div`
  padding-bottom: 50.5%;
  position: relative;
  overflow: hidden;

  [data-style-id='react-player'] {
    position: absolute;
  }

  @media ${device.small} {
    width: 100%;
  }

  ${(props: $IsSoundCloud) =>
    props.isSoundCloud &&
    css`
      ${Player} {
        display: none;
      }
    `};
`;

const Title = styled.h3`
  top: 1.5rem;
  position: fixed;
  color: rgb(255, 255, 255);
  max-width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: ${(props: $IsVisible) => (props.visible ? '1' : '0')};

  @media ${device.small} {
    max-width: 75%;
  }
`;
