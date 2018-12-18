import * as React from 'react';
import styled, {css} from 'styled-components';

import {device} from '../../../styles/utilities/device';
import {toRGBString} from '../../common/utils';
import zindex from '../../common/zindex';
import {FOOTER_HEIGHT_DESKTOP} from '../../controls/components/constants';
import {$Track} from '../../search/components/types';
import {$Color} from '../../store';
import Player, {$PlayerProps} from './Player';

interface $Props {
  currentlyPlaying: $Track | undefined;
  expanded: boolean;
  color: $Color;
  toggleExpanded(): void;
  togglePlaying(): void;
}

export default function PlayerBox({
  currentlyPlaying,
  expanded,
  toggleExpanded,
  color,
  togglePlaying,
  ...props
}: $Props & $PlayerProps) {
  if (!currentlyPlaying) {
    return null;
  }

  const isSoundCloud = currentlyPlaying.info.source === 'SOUNDCLOUD';
  return (
    <Positioning bg={color} expanded={expanded} onClick={expanded ? togglePlaying : toggleExpanded}>
      <IFrameBlocker />
      <SizingHack expanded={expanded} isSoundCloud={isSoundCloud}>
        {isSoundCloud && getTrackThumbnail(currentlyPlaying) !== '' ? (
          <SoundCloudArt expanded={expanded} src={getTrackThumbnail(currentlyPlaying)} />
        ) : isSoundCloud && getTrackThumbnail(currentlyPlaying) === '' ? (
          <NoArtwork expanded={expanded} />
        ) : null}
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

interface $HasColor {
  bg: $Color;
}

interface $IsExpanded {
  expanded: boolean;
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
  background-color: ${(props: $IsExpanded & $HasColor) =>
    props.expanded ? toRGBString(props.bg) : 'transparent'};

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

  ${(props: $IsExpanded) =>
    props.expanded
      ? css`
          position: absolute;
          overflow: hidden;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          max-width: 40rem;
          max-height: 40rem;
        `
      : css`
          float: right;
        `};
`;

const NoArtwork = styled.div`
  background-image: linear-gradient(135deg, #846170, #e6846e);
  height: 100%;
  width: 56.25%;

  ${(props: $IsExpanded) =>
    props.expanded
      ? css`
          position: absolute;
          overflow: hidden;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          max-width: 40rem;
          max-height: 40rem;
        `
      : css`
          float: right;
        `};
`;

const SizingHack = styled.div`
  transition: all linear 0.3s;

  ${(props: $IsSoundCloud & $IsExpanded) =>
    props.isSoundCloud &&
    css`
      ${Player} {
        display: none;
      }
    `};

  ${props =>
    props.expanded
      ? css`
          padding-bottom: 50.5%;
          position: relative;
          overflow: hidden;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);

          [data-style-id='react-player'] {
            position: absolute;
          }

          @media ${device.small} {
            width: 100%;
          }
        `
      : css`
          height: ${FOOTER_HEIGHT_DESKTOP};
          padding-bottom: 0;
          position: relative;
          width: 100%;
          left: 0;
          top: 0;
          transform: none;
        `};
`;
