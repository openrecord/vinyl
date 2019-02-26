import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {VelocityComponent} from 'velocity-react';

import {device} from '../../styles/utilities/device';
import zindex from '../common/zindex';
import {ROUTES} from '../routes/routes';

interface $Props {
  hide: boolean;
}

export default function Footer({hide}: $Props) {
  return (
    <VelocityComponent animation={{opacity: hide ? 0 : 1}}>
      <StyledFooter about={location.pathname === ROUTES.ABOUT}>
        <a href="https://twitter.com/openrecord" target="blank">
          <h5>Twitter</h5>
        </a>
        <span>•</span>
        <a href="https://github.com/openrecord/vinyl" target="blank">
          <h5>Github</h5>
        </a>
      </StyledFooter>
    </VelocityComponent>
  );
}

interface $StyledFooterProps {
  about: boolean;
}

const StyledFooter = styled.div`
  position: ${(props: $StyledFooterProps) => (props.about ? 'fixed' : 'relative')};
  display: flex;
  bottom: 0;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  width: 100%;
  z-index: ${zindex('footer')};

  h5 {
    color: white;
  }

  span {
    color: white;
    padding: 0 0.25rem;
  }

  a {
    &:hover {
      h5 {
        text-decoration: underline;
      }
    }
  }
`;
