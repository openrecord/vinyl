import * as React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {$Track} from '../../search/components/types';
import Track from '../../search/components/Track';
import {$Color} from '../../store';

interface $Props {
  index: number;
  track: $Track;
  bgColor: $Color;
  playing: boolean;
  isCurrentSong: boolean;
  onClick(): void;
  deleteTrack(): void;
}

export default function QueueTrack({
  index,
  track,
  bgColor,
  playing,
  isCurrentSong,
  onClick,
  deleteTrack
}: $Props) {
  return (
    <Draggable index={index} draggableId={track.id} key={track.id}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Track
            {...track.info}
            bgColor={bgColor}
            onClick={onClick}
            deleteTrack={deleteTrack}
            playing={playing}
            isCurrentSong={isCurrentSong}
          />
        </div>
      )}
    </Draggable>
  );
}
