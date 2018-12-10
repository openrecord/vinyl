import * as React from 'react';
import {all, get, set} from 'shades';

import {toQueryString} from '../../common/utils';
import useSearcher from './useSearcher';

const YOUTUBE_API_KEY = 'AIzaSyCum4fCWhpcRNIh8VzD3Fhny5nxYYJrlTI';

function getYoutubeURL(query: string) {
  return (
    'https://www.googleapis.com/youtube/v3/search' +
    toQueryString({
      q: query,
      key: YOUTUBE_API_KEY,
      part: 'snippet',
      type: 'video',
      videoEmbeddable: true,
      maxResults: 10,
      fields: 'items(snippet,id)'
    })
  );
}

interface $YoutubeResponse {
  items: $YoutubeResult[];
}

export interface $YoutubeResult {
  __typename: 'YoutubeResult';
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
      high: {
        url: string;
      };
    };
  };
}

export default function useYoutube(search: string) {
  const [results, setResults] = React.useState([] as $YoutubeResult[]);
  const searchYoutube = useSearcher(getYoutubeURL);
  React.useEffect(
    () => {
      if (search) {
        searchYoutube(search)
          .then(resp => resp.json() as Promise<$YoutubeResponse>)
          .then(get('items'))
          // @ts-ignore: needs traversal types
          .then(set(all, '__typename')('YoutubeResult'))
          .then(setResults);
      } else {
        setResults([]);
      }
    },
    [search]
  );
  return results;
}
