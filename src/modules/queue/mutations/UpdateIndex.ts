import gql from 'graphql-tag';
import * as _f from 'lodash/fp';
import {useMutation} from 'react-apollo-hooks';
import {all, cons, filter, find, mod, not, set} from 'shades';

import {$Playlist, $Track} from '../../search/components/types';

const UPDATE_INDEX = gql`
  mutation UpdateIndex($trackId: ID!, $newIdx: Int!) {
    updateIndex(trackId: $trackId, newIdx: $newIdx) {
      id
      tracks {
        id
        index
      }
    }
  }
`;
type $UpdateIndex = (id: string, idx: number, playlist: $Playlist) => void;

export default function useUpdateIndex(): $UpdateIndex {
  const updateIndex = useMutation(UPDATE_INDEX);
  return (trackId, newIdx, playlist) => {
    const newTracks = reorderTracks(trackId, newIdx, playlist.tracks);
    return updateIndex({
      variables: {trackId, newIdx},
      optimisticResponse: {
        __typename: 'Mutation',
        updateIndex: {
          __typename: 'Playlist',
          id: playlist.id,
          tracks: newTracks
        }
      }
    });
  };
}

const reorderTracks = (id: string, newIdx: number, tracks: $Track[]) => {
  const track = find({id})(tracks);
  const oldIdx = track!.index;
  return _f.pipe(
    filter(not({id})),
    mod(all(), 'index')(trackUpdater(oldIdx, newIdx)),
    cons(set('index')(newIdx)(track!)),
    _f.sortBy('index')
  )(tracks);
};

const trackUpdater = (oldIdx: number, newIdx: number) =>
  newIdx < oldIdx
    ? (idx: number) => (idx >= newIdx && idx < oldIdx ? idx + 1 : idx)
    : (idx: number) => (idx > oldIdx && idx <= newIdx ? idx - 1 : idx);
