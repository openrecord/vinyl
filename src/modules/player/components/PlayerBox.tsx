import * as React from 'react';
import styled, {css} from 'styled-components';

import {device} from '../../../styles/utilities/device';
import {toRGBString} from '../../common/utils';
import zindex from '../../common/zindex';
import {$Track} from '../../search/components/types';
import {$Color} from '../../store';
import Player, {$PlayerProps} from './Player';

interface $Props {
  currentlyPlaying: $Track | undefined;
  color: $Color;
  expanded: boolean;
  togglePlaying(): void;
}

export default function PlayerBox({
  currentlyPlaying,
  color,
  togglePlaying,
  expanded,
  ...props
}: $Props & $PlayerProps) {
  if (!currentlyPlaying) {
    return null;
  }

  const isSoundCloud = currentlyPlaying.info.source === 'SOUNDCLOUD';
  const art = getTrackThumbnail(currentlyPlaying);
  return (
    <Positioning bg={color} expanded={expanded} onClick={togglePlaying} data-id="player">
      <IFrameBlocker />
      <SizingHack isSoundCloud={isSoundCloud}>
        {isSoundCloud && art && <SoundCloudArt src={art} />}
        <Player currentlyPlaying={currentlyPlaying!} {...props} />
      </SizingHack>
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

interface $HasColor {
  bg: $Color;
}

interface $IsSoundCloud {
  isSoundCloud: boolean;
}

const Positioning = styled.div`
  position: relative;
  width: 100%;
  height: ${props => (props.expanded ? '100vh' : '0')};
  z-index: ${zindex('player')};
  overflow: hidden;
  transition: all linear 0.3s;
  background-color: ${(props: $IsExpanded & $HasColor) => toRGBString(props.bg)};

  [data-style-id='react-player'] > div {
    height: 250% !important;
    transform: translateY(-30%);
  }
`;

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

const SizingHack = styled.div`
  padding-bottom: 50.5%;
  position: relative;
  overflow: hidden;
  top: 50%;
  transform: translateY(-50%);

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
