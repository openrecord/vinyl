import * as _ from 'lodash';
import * as React from 'react';
import {all, get, set} from 'shades';

import {toQueryString} from '../../common/utils';

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
  const searcher = (query: string) =>
    fetch(getYoutubeURL(query))
      .then(resp => resp.json() as Promise<$YoutubeResponse>)
      .then(get('items'))
      .then(set(all, '__typename')('YoutubeResult'))
      // @ts-ignore: needs traversal ignatures
      .then(setResults);

  const [results, setResults] = React.useState([] as $YoutubeResult[]);
  const searchYoutube = React.useRef(_.debounce(searcher, 250, {trailing: true})).current;
  React.useEffect(
    () => {
      if (search) {
        searchYoutube(search);
      } else {
        setResults([]);
      }
    },
    [search]
  );
  return results;
}
