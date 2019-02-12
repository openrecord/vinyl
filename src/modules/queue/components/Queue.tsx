import * as React from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {has} from 'shades';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import {device} from '../../../styles/utilities/device';
import * as animations from '../../common/animations';
import ArrowNavigation from '../../common/components/ArrowNavigation';
import {$Playlist, $Track} from '../../search/components/types';
import {$Color} from '../../store';
import QueueTrack from './QueueTrack';

interface $Props {
  bgColor: $Color;
  playlist: $Playlist;
  currentlyPlayingId: string | undefined;
  playing: boolean;
  updatePlaying(track: $Track): void;
  togglePlaying(): void;
  deleteTrack(track: $Track): void;
  updateIndex(id: string, newIndex: number, playlist: $Playlist): void;
}

export default function Queue({
  bgColor,
  playlist,
  updatePlaying,
  togglePlaying,
  currentlyPlayingId,
  playing,
  deleteTrack,
  updateIndex
}: $Props) {
  const isCurrentSong = has({id: currentlyPlayingId});

  return (
    <DragDropContext
      onDragEnd={({draggableId, destination}) => {
        if (destination && Number.isSafeInteger(destination.index)) {
          updateIndex(draggableId, destination.index, playlist);
        }
      }}
    >
      <QueueList>
        <QueueHeader>Queue</QueueHeader>
        <Droppable droppableId="queue">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {provided.placeholder}
              <ArrowNavigation priority={ArrowNavigation.PRIORITY_MAP.QUEUE} childIsWrapped>
                <VelocityTransitionGroup
                  enter={{
                    animation: animations.rotate3d.in,
                    display: 'flex',
                    stagger: 90,
                    duration: 850
                  }}
                  leave={{animation: animations.rotate3d.out, display: 'flex'}}
                  runOnMount
                >
                  {playlist.tracks.map((track, idx) => (
                    <QueueTrack
                      track={track}
                      index={idx}
                      bgColor={bgColor}
                      onClick={isCurrentSong(track) ? togglePlaying : () => updatePlaying(track)}
                      deleteTrack={() => deleteTrack(track)}
                      playing={playing}
                      isCurrentSong={isCurrentSong(track)}
                      key={idx}
                    />
                  ))}
                </VelocityTransitionGroup>
              </ArrowNavigation>
            </div>
          )}
        </Droppable>
      </QueueList>
    </DragDropContext>
  );
}

const QueueList = styled.div`
  background: rgba(34, 34, 34, 0.2);
  max-height: 100vh;
  max-width: 30rem;
  overflow: scroll;

  @media ${device.medium} {
    max-height: none;
    max-width: none;
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const QueueHeader = styled.h3`
  color: white;
  display: block;
  padding: 1.5rem 0.5rem 0.5rem 0.5rem;
`;
