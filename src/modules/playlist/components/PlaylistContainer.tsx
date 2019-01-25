import gql from 'graphql-tag';
import * as React from 'react';
import {Subscription} from 'react-apollo';

import PlaylistFragments from '../../common/fragments/PlaylistFragments';
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

const ON_TRACK_ADDED = gql`
  subscription OnTrackAdded($playlist: String!) {
    playlist(where: {node: {name: $playlist}}) {
      node {
        ...AllPlaylist
      }
    }
  }
  ${PlaylistFragments.all}
`;

const ON_TRACK_UPDATED = gql`
  subscription OnTrackUpdated($playlist: String!) {
    track(where: {node: {playlist: {name: $playlist}}}) {
      node {
        id
        index
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
      player: {color, isActive, currentlyPlaying, expanded}
    },
    actions: {
      search: {toggle}
    }
  } = useStore();

  const {
    data: {playlist: {tracks} = {tracks: []}}
  } = useSimpleQuery<$QueryData>(query, {playlist});
  const createPlaylist = useCreatePlaylist(playlist);

  const isEmpty = tracks.length === 0;
  return (
    <Subscription subscription={ON_TRACK_ADDED} variables={{playlist}}>
      {__ => (
        <Subscription subscription={ON_TRACK_UPDATED} variables={{playlist}}>
          {__ => (
            <Playlist
              color={color}
              isOpen={isOpen}
              showAddBtn={(!currentlyPlaying || !expanded || isActive) && !isEmpty}
              isEmpty={isEmpty}
              toggleSearch={toggle('isOpen')}
              createPlaylist={createPlaylist}
            />
          )}
        </Subscription>
      )}
    </Subscription>
  );
}
