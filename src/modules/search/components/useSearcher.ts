import * as _ from 'lodash';
import {useRef} from 'react';

export default (urlGenerator: (query: string) => string) => {
  const fetcher = useRef(_.throttle(query => fetch(urlGenerator(query)), 750));
  return fetcher.current;
};
