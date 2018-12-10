import * as React from 'react';
import {all, set} from 'shades';

import {toQueryString} from '../../common/utils';
import useSearcher from './useSearcher';

const SOUNDCLOUD_API_KEY = '32eb3539260715fa1251fcf9989263f2';

function getSoundCloudUrl(query: string) {
  return (
    'https://api.soundcloud.com/tracks' +
    toQueryString({
      q: query,
      limit: 10,
      client_id: SOUNDCLOUD_API_KEY
    })
  );
}

export interface $SoundCloudResult {
  __typename: 'SoundCloudResult';
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  url: string;
}

export default function useSoundCloud(search: string) {
  const [results, setResults] = React.useState([] as $SoundCloudResult[]);
  const searchSoundcloud = useSearcher(getSoundCloudUrl);
  React.useEffect(
    () => {
      if (search) {
        searchSoundcloud(search)
          .then(resp => resp.json())
          // @ts-ignore: needs traversal types
          .then(set(all, '__typename')('SoundCloudResult'))
          .then(setResults);
      } else {
        setResults([]);
      }
    },
    [search]
  );
  return results;
}
