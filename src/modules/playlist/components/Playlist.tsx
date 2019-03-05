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
  expanded: boolean;
  showAddBtn: boolean;
  createPlaylist(): void;
  toggleSearch(value?: boolean): void;
}

export default class Playlist extends React.Component<$Props> {
  componentDidMount() {
    this.props.createPlaylist();
  }

  render() {
    const {color, isOpen, isEmpty, showAddBtn, toggleSearch, expanded} = this.props;
    return (
      <StyledPlaylistBackground style={{backgroundColor: toRGBString(color)}}>
        <StyledPlaylist>
          <BottomRight expanded={expanded}>
            <VelocityComponent animation={{opacity: showAddBtn ? 1 : 0}}>
              <AddSong onClick={toggleSearch} isOpen={isOpen} />
            </VelocityComponent>
          </BottomRight>

          <SearchContainer />

          {isEmpty ? (
            <EmptyCollection>
              <h2>Add song to start playlist</h2>
              <AddSong onClick={toggleSearch} isOpen={isOpen} />
              <h2 />
            </EmptyCollection>
          ) : (
            <>
              <PlayerContainer />
              <QueueContainer />
            </>
          )}
        </StyledPlaylist>
      </StyledPlaylistBackground>
    );
  }
}

interface $IsExpanded {
  expanded: boolean;
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

  @media ${device.medium} {
    flex-direction: column;
  }
`;

const BottomRight = styled.div`
  display: ${(props: $IsExpanded) => (props.expanded ? 'inline-block' : 'none')};
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: ${zindex('header')};
`;

const EmptyCollection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;
  height: 100vh;
  width: 100%;
`;
