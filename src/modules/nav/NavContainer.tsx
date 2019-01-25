import * as React from 'react';

import {useStore} from '../store';
import Nav from './Nav';

export default function NavContainer() {
  const {
    state: {
      player: {isActive, currentlyPlaying, expanded}
    }
  } = useStore();

  return <Nav hide={!!currentlyPlaying && !isActive && expanded} />;
}
