import * as React from 'react';
import {toast} from 'react-toastify';

import Toast from '../../common/components/Toast';
import usePlaylistName from '../../common/hooks/usePlaylistName';
import {useStore} from '../../store';
import useAddToPlaylist from '../mutations/useAddToPlaylist';
import Search from './Search';
import useTrackSearch from './useTrackSearch';

export default function SearchContainer() {
  const {
    state: {
      search: {query, isOpen}
    },
    actions: {
      search: {toggle, setter}
    }
  } = useStore();

  const addToPlaylist = useAddToPlaylist();
  const playlist = usePlaylistName();

  if (!playlist) {
    return null;
  }

  const results = useTrackSearch(query);

  return (
    <Search
      isOpen={isOpen}
      toggleSearch={toggle('isOpen')}
      query={query}
      results={results}
      setSearch={setter('query')}
      enqueue={track => {
        addToPlaylist(track, playlist);
        toast(<Toast message="Song Added!" />);
      }}
      clearSearch={() => setter('query')('')}
    />
  );
}
