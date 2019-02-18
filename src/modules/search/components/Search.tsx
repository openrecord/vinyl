import * as React from 'react';
import * as Modal from 'react-modal';
import zindex from '../../common/zindex';
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
        overlay: {backgroundColor: 'rgba(20, 20, 20, 0.5)', zIndex: zindex('search')},
        content: {
          border: 0,
          background: '#222222',
          width: '50%',
          top: 'auto',
          left: 'auto',
          bottom: 'auto',
          height: '100%',
          padding: '0',
          right: '0',
          maxWidth: '30rem',
          overflow: 'scroll'
        }
      }}
    >
      <SearchBar query={query} onChange={setSearch} />
      <SearchResults results={results} enqueue={enqueue} />
    </Modal>
  );
}
