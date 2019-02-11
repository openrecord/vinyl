import * as React from 'react';
import styled from 'styled-components';
import {VelocityComponent} from 'velocity-react';

import {device} from '../../../styles/utilities/device';
import {toRGBString} from '../../common/utils';
import zindex from '../../common/zindex';
import PlayerContainer from '../../player/components/PlayerContainer';
import QueueContainer from '../../queue/components/QueueContainer';
import SearchContainer from '../../search/components/SearchContainer';
import {$Color} from '../../store';
import AddSong from './AddSong';

interface $Props {
  color: $Color;
  isOpen: boolean;
  isEmpty: boolean;
  showAddBtn: boolean;
  createPlaylist(): void;
  toggleSearch(value?: boolean): void;
}

export default class Playlist extends React.Component<$Props> {
  componentDidMount() {
    this.props.createPlaylist();
  }

  render() {
    const {color, isOpen, isEmpty, showAddBtn, toggleSearch} = this.props;

    return (
      <StyledPlaylistBackground style={{backgroundColor: toRGBString(color)}}>
        <StyledPlaylist>
          <TopRight>
            <VelocityComponent animation={{opacity: showAddBtn ? 1 : 0}}>
              <AddSong onClick={toggleSearch} isOpen={isOpen} />
            </VelocityComponent>
          </TopRight>
          <PlayerContainer />
          <SearchContainer />
          {isEmpty ? (
            <EmptyCollection>
              <AddSong onClick={toggleSearch} isOpen={isOpen} />
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
  transition: background-color 1.5s linear;
  min-height: 100vh;
`;

const StyledPlaylist = styled.div`
  display: flex;
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
  bottom: 0;
  right: 0;
  z-index: ${zindex('header')};
`;

const EmptyCollection = styled.div`
  text-align: center;
  color: white;

  button {
    font-size: 2.25rem;
    padding: 1.25rem 2.5rem;
    position: relative;
    top: 2.5rem;
  }
`;
