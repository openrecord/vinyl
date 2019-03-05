import * as React from 'react';

import {useStore} from '../store';
import Footer from './Footer';
import {ROUTES} from '../routes/routes';

export default function FooterContainer() {
  const {
    state: {
      player: {isActive, currentlyPlaying, expanded}
    }
  } = useStore();

  return (
    <Footer
      info={location.pathname === ROUTES.ABOUT || location.pathname === ROUTES.LANDING}
      hide={!!currentlyPlaying && !isActive && expanded}
    />
  );
}
