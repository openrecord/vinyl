import React from 'react';
import styled from 'styled-components';

import UniplayerContainer from '../uniplayer/UniplayerContainer';

export default function Home({}) {
  return (
    <main>
      <Hero />
      <UniplayerContainer/>
    </main>
  );
}

function Hero() {
  const HeroContainer = styled.div`
    margin: 5px auto;
    text-align: center;
    position: relative;
    z-index: 2;

    h1{
      color: #FFFFFF;
      line-height: normal;
      font-size: 24px;
    }
  `;

  return (
    <HeroContainer>
      <h1>OPEN RECORD</h1>
    </HeroContainer>
  );
}
