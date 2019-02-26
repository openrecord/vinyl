import * as React from 'react';

import {useStore} from '../store';
import Footer from './Footer';

export default function FooterContainer() {
  const {
    state: {
      player: {isActive, currentlyPlaying, expanded}
    }
  } = useStore();

  return <Footer hide={!!currentlyPlaying && !isActive && expanded} />;
}
