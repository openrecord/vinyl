import * as React from 'react';
import styled from 'styled-components';

import zindex from '../../common/zindex';
import SearchBar from './SearchBar';
import SearchInner from './SearchInner';
import SearchResults from './SearchResults';
import {$Result} from './types';

interface $Props {
  query: string;
  results: $Result[];
  isOpen: boolean;
  enqueue(song: $Result): void;
  setSearch(query: string): void;
  toggleSearch(value?: boolean): void;
  clearSearch(): void;
}

export default function Search({
  query,
  setSearch,
  results,
  enqueue,
  isOpen,
  toggleSearch,
  clearSearch
}: $Props) {
  return (
    <SearchHolder isOpen={isOpen}>
      <SearchInner isOpen={isOpen} toggleSearch={toggleSearch} clearSearch={clearSearch}>
        <SearchBar query={query} onChange={setSearch} />
        <SearchResults results={results} enqueue={enqueue} />
      </SearchInner>
      <SearchResultsTarget id="search-results-target" />
    </SearchHolder>
  );
}

const SearchHolder = styled.div`
  background: rgba(20, 20, 20, 0.5);
  display: ${(props: {isOpen: boolean}) => (props.isOpen ? '	flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: ${zindex('search-holder')};
`;

const SearchResultsTarget = styled.div`
  position: relative;
`;
