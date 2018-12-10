import * as React from 'react';
import styled from 'styled-components';

import {device} from '../../../styles/utilities/device';
import {toRGBString} from '../../common/utils';
import zindex from '../../common/zindex';
import ControlsContainer from '../../controls/components/ControlsContainer';
import PlayerContainer from '../../player/components/PlayerContainer';
import QueueContainer from '../../queue/components/QueueContainer';
import SearchContainer from '../../search/components/SearchContainer';
import {$Color} from '../../store';
import AddSong from './AddSong';

interface $Props {
  color: $Color;
  isOpen: boolean;
  isEmpty: boolean;
  createPlaylist(): void;
  toggleSearch(value?: boolean): void;
}

export default class Playlist extends React.Component<$Props> {
  componentDidMount() {
    this.props.createPlaylist();
  }

  render() {
    const {color, isOpen, isEmpty, toggleSearch} = this.props;

    return (
      <StyledPlaylistBackground style={{backgroundColor: toRGBString(color)}}>
        <StyledPlaylist>
          <TopRight>
            <AddSong onClick={toggleSearch} isOpen={isOpen} />
          </TopRight>
          <PlayerContainer />
          <ControlsContainer />
          <SearchContainer />
          {isEmpty ? (
            <EmptyCollection>
              <h2>This collection is currently empty</h2>
              <h4>Click 'Add Song' button to start collecting</h4>
            </EmptyCollection>
          ) : (
            <QueueContainer />
          )}
        </StyledPlaylist>
      </StyledPlaylistBackground>
    );
  }
}

const StyledPlaylistBackground = styled.div`
  transition: background-color 0.5s linear;
  height: 100vh;
`;

const StyledPlaylist = styled.div`
  display: block;
  margin: 0 auto;
  position: relative;
  width: 100%;
  transition: all 0.1s;

  @media ${device.small} {
    padding-top: 0;
    width: 100%;
  }
`;

const TopRight = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${zindex('header')};
`;

const EmptyCollection = styled.div`
  margin: 2rem auto;
  text-align: center;
  color: white;

  h2 {
    margin-bottom: 1rem;
  }

  h4 {
    color: rgba(98, 98, 98, 1);
  }

  @media ${device.small} {
    margin: 1.5rem auto;

    h2 {
      margin-bottom: 0.75rem;
    }
  }
`;
