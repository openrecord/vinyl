import * as React from 'react';
import {all, set} from 'shades';

import {toQueryString} from '../../common/utils';

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
  permalink_url: string;
  artwork_url: string;
}

export default function useSoundCloud(search: string) {
  const [results, setResults] = React.useState([] as $SoundCloudResult[]);
  React.useEffect(
    () => {
      if (search) {
        fetch(getSoundCloudUrl(search))
          .then(resp => resp.json())
          .then(set(all(), '__typename')('SoundCloudResult'))
          .then(setResults);
      } else {
        setResults([]);
      }
    },
    [search]
  );
  return results;
}
