import classname from 'classnames';
import Color from 'color';
import * as React from 'react';
import styled, {css} from 'styled-components';

import {device} from '../../../../styles/utilities/device';
import PlayPause from '../../../common/components/PlayPause';
import {ifEnter} from '../../../common/utils';
import {$Color} from '../../../store';
import Options from './Options';

const speaker = require('../../../controls/components/images/speaker.svg');
const scIcon = require('../images/soundcloud.svg');
const ytIcon = require('../images/youtube.svg');
const miniAdd = require('../images/mini-plus.svg');
const checkAdd = require('../images/check-mark.svg');

interface $Props {
  thumbnail: string | null;
  title: string;
  id?: string;
  onClick(): any;
  deleteTrack?: () => any;
  search?: boolean;
  playing?: boolean;
  isCurrentSong?: boolean;
  youtube?: boolean;
  soundcloud?: boolean;
}

export default function Track({
  thumbnail,
  title,
  id,
  onClick,
  deleteTrack,
  search = false,
  playing = false,
  isCurrentSong = false,
  soundcloud = false
}: $Props) {
  return (
    <StyledResult
      onClick={onClick}
      className={classname({'is-current-song': isCurrentSong})}
      onKeyPress={ifEnter(onClick)}
      tabIndex={0}
      data-id={id}
      data-track-type={search ? 'search' : 'queue'}
      search={search}
    >
      {search ? (
        <AddIcon>
          <MiniPlus>
            <img src={miniAdd} />
          </MiniPlus>
          <CheckMark>
            <img src={checkAdd} />
          </CheckMark>
        </AddIcon>
      ) : (
        <OrderLines>
          <span />
          <span />
        </OrderLines>
      )}

      <ImageHolder search={search}>
        {thumbnail ? (
          <Thumbnail
            crossOrigin="anonymous"
            src={getThumbnailUrl(thumbnail)}
            data-id={id}
            search={search}
          />
        ) : (
          <NoArtwork />
        )}
        <PlayBackground>
          <IconContainer>
            {search ? null : (
              <>
                {isCurrentSong && <Speaker src={speaker} />}
                <PlayPause play={!playing || !isCurrentSong} />
              </>
            )}
          </IconContainer>
        </PlayBackground>
      </ImageHolder>
      <h5>{title}</h5>
      {search && (
        <SourceIcon>
          <img src={soundcloud ? scIcon : ytIcon} />
        </SourceIcon>
      )}
      {!search && !!deleteTrack && <Options deleteTrack={deleteTrack} />}
    </StyledResult>
  );
}

const IconContainer = styled.span`
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 40%;
    fill: white;
  }
`;

const PlayBackground = styled.span`
  background: rgba(16, 16, 16, 0.8);
  height: 100%;
  position: absolute;
  opacity: 0;
  width: 100%;
  transition: all 0.1s;
`;

const Speaker = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 1.25rem;
  width: 1.5rem;
  transform: translate(-50%, -50%);
`;

interface $ImageHolderProps {
  search: boolean;
}

const OrderLines = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;

  span {
    background: #e2e2e2;
    border-radius: 1px;
    display: block;
    height: 0.0625rem;
    margin: 0.0625rem 0;
    width: 0.5rem;
  }
`;

const MiniPlus = styled.div`
  position: absolute;
  opacity: 1;
  transition: all 0.1s;

  img {
    display: inherit;
  }
`;

const CheckMark = styled.div`
  position: absolute;
  opacity: 0;
  transition: all 0.1s;

  img {
    display: inherit;
  }
`;

const AddIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.5rem;
  padding: 0.5rem;
  width: 0.5rem;
`;

const ImageHolder = styled.div`
  display: inline-block;
  background: linear-gradient(120.21deg, #1b2845 34.35%, #416098 99.2%);
  position: relative;
  height: 3rem;
  overflow: hidden;
  margin-right: 0.5rem;
  min-width: 5.5rem;

  @media ${device.small} {
    height: 2.75rem;
    min-width: 5rem;
  }
`;

const Thumbnail = styled.img`
  height: 4.125rem;
  position: absolute;
  top: -0.55rem;
  width: 5.5rem;

  @media ${device.small} {
    height: 3.75rem;
    top: -0.5rem;
    width: 5rem;
  }
`;

const NoArtwork = styled.div`
  background-image: linear-gradient(135deg, #846170, #e6846e);
  height: 3rem;
  min-width: 5.5rem;
  @media ${device.small} {
    height: 2.75rem;
    min-width: 5rem;
  }
`;

const SourceIcon = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 0.75rem;
  opacity: 1;
  img {
    align-content: center;
  }
`;

const StyledResult = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0;
  box-sizing: border-box;
  width: 100%;
  transition: background-color 0.1s linear;

  ${PlayPause} {
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &.is-current-song,
  :hover {
    ${PlayBackground} {
      opacity: 1;
    }
  }

  &.is-current-song:not(:hover) {
    ${PlayPause} {
      opacity: 0;
    }
    ${Speaker} {
      opacity: 1;
    }
  }

  :hover {
    background: ${(props: $ImageHolderProps) =>
      props.search ? 'rgba(24,24,24,0.4)' : 'rgba(34, 34, 34, 0.3)'};
    ${PlayPause} {
      opacity: 1;
    }

    ${Speaker} {
      opacity: 0;
    }

    ${MiniPlus} {
      opacity: 0;
    }

    ${CheckMark} {
      opacity: 1;
    }
  }

  :focus {
    outline: none;
  }

  h5 {
    overflow: hidden;
    color: white;
    display: -webkit-box;
    margin-right: 0.5rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    transition: color 0.1s linear;

    @media ${device.small} {
      margin-right: 0.25rem;
    }
  }
`;

function getThumbnailUrl(url: string): string {
  return `https://cors-anywhere.herokuapp.com/` + url;
}
