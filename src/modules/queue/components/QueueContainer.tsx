import gql from 'graphql-tag';
import * as _f from 'lodash/fp';
import * as React from 'react';
import {toast} from 'react-toastify';
import {mod} from 'shades';

import Toast from '../../common/components/Toast';
import PlaylistFragments from '../../common/fragments/PlaylistFragments';
import usePlaylistName from '../../common/hooks/usePlaylistName';
import useUpdatePlaying from '../../common/mutations/UpdatePlaying';
import {useSimpleQuery} from '../../common/utils';
import {$Track} from '../../search/components/types';
import {useStore} from '../../store';
import useDeleteTrack from '../mutations/DeleteTrack';
import useUpdateIndex from '../mutations/UpdateIndex';
import Queue from './Queue';

const query = gql`
  query Queue($playlist: String!) {
    playlist(where: {name: $playlist}) {
      ...AllPlaylist
    }
  }
  ${PlaylistFragments.all}
`;

interface $QueryData {
  playlist: {
    id: string;
    name: string;
    tracks: $Track[];
  };
}
export default function QueueContainer() {
  const playlistName = usePlaylistName();
  if (!playlistName) {
    return null;
  }

  const {
    data: {playlist = {id: '', name: '', tracks: []}}
  } = useSimpleQuery<$QueryData>(query, {
    playlist: playlistName
  });

  const {
    state: {
      player: {currentlyPlaying, playing, color, expanded}
    },
    actions: {
      player: {toggle}
    }
  } = useStore();

  const updatePlaying = useUpdatePlaying();
  const deleteTrack = useDeleteTrack();
  const updateIndex = useUpdateIndex();

  return (
    <Queue
      bgColor={color}
      playlist={mod('tracks')(_f.sortBy('index'))(playlist)}
      playing={playing}
      expanded={expanded}
      togglePlaying={toggle('playing')}
      updatePlaying={(track: $Track) => {
        // Need to check if it's already playing, otherwise it actually
        // stops playback
        if (!playing) {
          toggle('playing')(true);
        }
        updatePlaying(track);
      }}
      deleteTrack={(track: $Track) => {
        deleteTrack({playlist: playlistName, trackId: track.id});
        toast(<Toast message="Song Deleted" />);
      }}
      updateIndex={updateIndex}
      currentlyPlayingId={currentlyPlaying && currentlyPlaying.id}
    />
  );
}
