import * as React from 'react';

import Button from './Button';
const addPlus = require('./images/add-plus.svg');

interface $Props {
  onClick: () => void;
  isOpen: boolean;
}

const open = {
  transform: 'rotate(45deg)',
  padding: '0.325rem 0'
};

const close = {
  padding: '0.325rem 0'
};

export default function AddSong({onClick, isOpen}: $Props) {
  return (
    <Button onClick={onClick} data-id="show-hide-search">
      <img src={addPlus} style={isOpen ? open : close} />
    </Button>
  );
}
