import * as _ from 'lodash';
import * as React from 'react';

export default function useDebouncedSearch<T>(
  search: string,
  searcher: (query: string) => Promise<T[]>
): T[] {
  const [results, setResults] = React.useState([] as T[]);
  const debouncedSearch = React.useRef(_.debounce(search => searcher(search).then(setResults), 500))
    .current;
  React.useEffect(() => {
    if (search) {
      debouncedSearch.cancel();
      debouncedSearch(search);
    } else {
      setResults([]);
    }
  }, [search]);
  return results;
}
