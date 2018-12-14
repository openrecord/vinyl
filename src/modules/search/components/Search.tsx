import * as React from 'react';
import * as Modal from 'react-modal';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import {$Result} from './types';

interface $Props {
  query: string;
  results: $Result[];
  isOpen: boolean;
  enqueue(song: $Result): void;
  setSearch(query: string): void;
  toggleSearch(value?: boolean): void;
}

Modal.setAppElement('#root');

export default function Search({query, setSearch, results, enqueue, isOpen, toggleSearch}: $Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => toggleSearch(false)}
      style={{
        overlay: {backgroundColor: 'rgba(20, 20, 20, 0.5)', zIndex: '3'},
        content: {
          padding: '0.75rem 2rem',
          border: 0,
          background: 'white',
          borderRadius: '2rem',
          width: '80%',
          height: '80%',
          left: '50%',
          top: '50%',
          maxWidth: '50rem',
          overflow: 'hidden',
          transform: 'translate(-50%,-50%)'
        }
      }}
    >
      <SearchBar query={query} onChange={setSearch} />
      <SearchResults results={results} enqueue={enqueue} />
    </Modal>
  );
}
