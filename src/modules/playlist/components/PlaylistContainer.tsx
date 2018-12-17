import gql from 'graphql-tag';
import * as React from 'react';

import usePlaylistName from '../../common/hooks/usePlaylistName';
import {useSimpleQuery} from '../../common/utils';
import {$Playlist} from '../../search/components/types';
import {useStore} from '../../store';
import {useCreatePlaylist} from '../mutations/CreatePlaylist';
import Playlist from './Playlist';

const query = gql`
  query PlaylistQuery($playlist: String!) {
    playlist(where: {name: $playlist}) {
      id
      tracks {
        id
      }
    }
  }
`;

interface $QueryData {
  playlist: $Playlist;
}

export default function PlaylistContainer() {
  const playlist = usePlaylistName();
  if (!playlist) {
    return null;
  }
  const {
    state: {
      search: {isOpen},
      player: {color, isActive, currentlyPlaying}
    },
    actions: {
      search: {toggle}
    }
  } = useStore();

  const {
    data: {playlist: {tracks} = {tracks: []}}
  } = useSimpleQuery<$QueryData>(query, {playlist});
  const createPlaylist = useCreatePlaylist(playlist);

  return (
    <Playlist
      color={color}
      isOpen={isOpen}
      showAddBtn={!!currentlyPlaying && !isActive}
      isEmpty={tracks.length === 0}
      toggleSearch={toggle('isOpen')}
      createPlaylist={createPlaylist}
    />
  );
}
