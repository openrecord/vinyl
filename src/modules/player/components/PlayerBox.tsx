import * as React from 'react';
import styled, {css} from 'styled-components';

import zindex from '../../common/zindex';
import {$Track} from '../../search/components/types';
import {$Color} from '../../store';
import Player, {$PlayerProps} from './Player';

interface $Props {
  currentlyPlaying: $Track | undefined;
  color: $Color;
  togglePlaying(): void;
}

export default function PlayerBox({
  currentlyPlaying,
  color,
  togglePlaying,
  ...props
}: $Props & $PlayerProps) {
  if (!currentlyPlaying) {
    return null;
  }

  const isSoundCloud = currentlyPlaying.info.source === 'SOUNDCLOUD';
  const art = getTrackThumbnail(currentlyPlaying);
  return (
    <Sizing onClick={togglePlaying} isSoundCloud={isSoundCloud} gradient={isSoundCloud && !art}>
      <IFrameBlocker />
      {isSoundCloud && art && <SoundCloudArt src={art} />}
      <Player currentlyPlaying={currentlyPlaying!} {...props} />
    </Sizing>
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

interface $isSoundCloud {
  isSoundCloud: boolean;
}

interface $HasGradient {
  gradient: boolean;
}

const Sizing = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  ${(props: $isSoundCloud & $HasGradient) =>
    props.gradient &&
    css`
      background-image: linear-gradient(135deg, #846170, #e6846e);
    `}

  [data-style-id='react-player'] {
    overflow: hidden;
    ${props =>
      props.isSoundCloud &&
      css`
        display: none;
      `}

    & > div {
      height: 250% !important;
      transform: translateY(-30%);
    }
  }
`;

const IFrameBlocker = styled.div`
  cursor: pointer;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: ${zindex('iframeblocker')};
`;

const SoundCloudArt = styled.img`
  position: absolute;
  overflow: hidden;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  max-height: 40rem;
`;
