import * as React from 'react';

import Button from './Button';
const closeX = require('./images/close-x.svg');

interface $Props {
  onClick: () => void;
  isOpen: boolean;
}

export default function AddSong({onClick, isOpen}: $Props) {
  return (
    <Button onClick={onClick} data-id="show-hide-search">
      {isOpen ? <img src={closeX} /> : 'Add Song'}
    </Button>
  );
}
