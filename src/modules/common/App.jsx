import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import styled from 'styled-components';

import HomeContainer from '../home/HomeContainer';
import HealthContainer from '../health/HealthContainer';

// Import common styles
import './styles/base.scss';

export default function App({history}) {

  const Nav = styled.nav`
    position: absolute;
    text-align: left;
    z-index: 2;

    a{
      color: white;

      &:hover{
        text-decoration: underline;
      }
    }

  `;

  return (
    <ConnectedRouter history={history}>
      <div>
        <Nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/health'}>Health</Link>
        </Nav>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/health" component={HealthContainer} />
          <Route render={() => <div>Route does not exist!</div>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}
