import React from 'react';
import styled from 'styled-components';

export default function Landing({}) {
  return (
    <LandingBox/>
  );
}

function LandingBox() {
  const LandingInner = styled.div`
    background: #9C4D9D;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: fixed;
    z-index: 3;

    h1{
      color: #090C15;
      line-height: normal;
      font-size: 48px;
      font-weight: 700;
      text-align: center;
      left: 50%;
      top: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 8;
    }
  `;

  const Circle = styled.div`
    border-radius: 50%;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);

    &#c1{
      width: 24%;
      padding-top: 24%;
      background: #FFFFFF;
      z-index: 7;
    }
    &#c2{ width: 40%; padding-top: 40%; background: #FCD731; z-index: 6; }
    &#c3{ width: 56%; padding-top: 56%; background: #FBB12B; z-index: 5; }
    &#c4{ width: 72%; padding-top: 72%; background: #FB8235; z-index: 4; }
    &#c5{ width: 88%; padding-top: 88%; background: #F8785D; z-index: 3; }
    &#c6{ width: 100%; padding-top: 100%; background: #BC5BA1; z-index: 2; }
  `;

  return (
    <LandingInner>
      <h1>Listen</h1>
      <Circle id="c1" />
      <Circle id="c2" />
      <Circle id="c3" />
      <Circle id="c4" />
      <Circle id="c5" />
      <Circle id="c6" />
    </LandingInner>
  );
}
