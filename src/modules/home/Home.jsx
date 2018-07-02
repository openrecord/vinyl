import React from 'react';
import styled from 'styled-components';

import UniplayerContainer from '../uniplayer/UniplayerContainer';
import LandingContainer from '../landing/landingContainer'

export default function Home({}) {
  return (
    <main>
      <UniplayerContainer/>
      <LandingContainer/>
    </main>
  );
}
