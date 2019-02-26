import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {VelocityComponent} from 'velocity-react';

import {device} from '../../styles/utilities/device';
import zindex from '../common/zindex';
import {ROUTES} from '../routes/routes';

const recordLogo = require('../common/components/images/record.svg');

interface $Props {
  hide: boolean;
  about: boolean;
}

export default function Nav({hide}: $Props) {
  return (
    <VelocityComponent animation={{opacity: hide ? 0 : 1}}>
      <StyledNav
        landing={location.pathname === ROUTES.LANDING}
        about={location.pathname === ROUTES.ABOUT}
      >
        <Link to={ROUTES.LANDING}>
          <Logo about={location.pathname === ROUTES.ABOUT}>
            <Record>
              <img src={recordLogo} />
            </Record>
            <span />
          </Logo>
        </Link>
        <Link to={ROUTES.ABOUT}>
          <InfoBubble about={location.pathname === ROUTES.ABOUT}>
            <span>i</span>
          </InfoBubble>
        </Link>
      </StyledNav>
    </VelocityComponent>
  );
}

interface $StyledNavProps {
  landing: boolean;
  about: boolean;
}

interface $InfoBubbleProps {
  about: boolean;
}

interface $LogoProps {
  about: boolean;
}

const InfoBubble = styled.div`
  align-items: center;
  background: white;
  border-radius: 50%;
  display: ${(props: $InfoBubbleProps) => (props.about ? 'none' : 'flex')};
  justify-content: center;

  height: 2rem;
  margin-right: 1rem;
  width: 2rem;
  text-align: center;
  transition: all 0.1s;

  span {
    color: black;
    font-family: 'Haas Med';
    font-size: 1.25rem;
    transition: all 0.1s;
  }
`;

const Record = styled.div`
  height: 2.5rem;
  margin-right: 0.5rem;
  width: 2.5rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  &:hover {
    span {
      text-decoration: underline;
    }
  }

  span {
    display: inline-block;
    cursor: pointer;
    color: white;
    font-size: 1.25rem;
    font-family: 'Haas Med';
    letter-spacing: 0.0675rem;
    position: relative;
    transition: all 0.1s;

    &:before {
      content: 'OPENRECORD';
    }

    @media ${device.small} {
      &:before {
        content: ${(props: $LogoProps) => (props.about ? '"O/R"' : '"OPENRECORD"')};
      }
    }
  }
`;

const StyledNav = styled.nav`
  background: 'transparent';
  display: ${(props: $StyledNavProps) =>
    props.landing || props.about ? 'block' : 'none !important'};
  display: flex;
  position: absolute;
  align-items: center;
  pointer-events: none;
  width: 100%;
  justify-content: space-between;
  z-index: ${zindex('nav')};

  a {
    pointer-events: all;

    &:hover {
      ${InfoBubble} {
        background: black;
        span {
          color: white;
        }
      }
    }
  }
`;
