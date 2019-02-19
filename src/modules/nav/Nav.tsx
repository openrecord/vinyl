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
}

export default function Nav({hide}: $Props) {
  return (
    <VelocityComponent animation={{opacity: hide ? 0 : 1}}>
      <StyledNav landing={location.pathname === ROUTES.LANDING}>
        <Link to={ROUTES.LANDING}>
          <Logo>
            <Record>
              <img src={recordLogo} />
            </Record>
            <span>OPENRECORD</span>
          </Logo>
        </Link>
      </StyledNav>
    </VelocityComponent>
  );
}

interface $StyledNavProps {
  landing: boolean;
}

const StyledNav = styled.nav`
  background: 'transparent';
  display: ${(props: $StyledNavProps) => (props.landing ? 'block' : 'none !important')};
  display: block;
  position: absolute;
  z-index: ${zindex('nav')};
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
    transition: all 0.1s;
  }
`;
