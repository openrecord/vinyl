import {all, set} from 'shades';

import {toQueryString} from '../../common/utils';
import useDebouncedSearch from '../hooks/useDebouncedSearch';

const SOUNDCLOUD_API_KEY = '32eb3539260715fa1251fcf9989263f2';

const getSoundCloudUrl = (query: string) =>
  'https://api.soundcloud.com/tracks' +
  toQueryString({
    q: query,
    limit: 10,
    client_id: SOUNDCLOUD_API_KEY
  });

function searchSoundCloud(search: string) {
  return fetch(getSoundCloudUrl(search))
    .then(resp => resp.json())
    .then(set(all(), '__typename')('SoundCloudResult'));
}

export interface $SoundCloudResult {
  __typename: 'SoundCloudResult';
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  url: string;
  permalink_url: string;
  artwork_url: string;
}

export default function useSoundCloud(search: string) {
  return useDebouncedSearch(search, searchSoundCloud);
}
