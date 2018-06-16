import React from 'react';
import styled from 'styled-components';

export default function Home({}) {
  return (
    <main>
      <Hero />
    </main>
  );
}

function Hero() {
  const HeroContainer = styled.div`
    * {
      margin: 25px auto;
      max-width: 750px;
      text-align: center;
    }

    p {
      font-size: 24px;
      line-height: 32px;
    }

    button {
      display: block;
      font-size: 16px;
    }
  `;

  return (
    <HeroContainer>
      <h1>Open Record</h1>
      <p>
        Something about music
      </p>
      <button>Register or something</button>
    </HeroContainer>
  );
}