import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import styled from 'styled-components';

import HomeContainer from '../home/HomeContainer';

// Import common styles
import './styles/base.scss';

export default function App({history}) {

  const Nav = styled.nav`
    margin: 14px;
    position: relative;
    text-align: left;
    z-index: 5;

    a{
      color: white;
      display: inline-block;
      position: relative;

      &:hover{
        text-decoration: underline;
      }

      &.contribute-link{
        float: right;
      }

      h2{
        display: inline-block;
        font-weight: 700;
        padding: 8px;
        position: relative;
      }
    }

  `;

  return (
    <ConnectedRouter history={history}>
      <div>
        <Nav>
          <Link className="home-link" to={'/'}><h2>OPENRECORD</h2></Link>
          <Link className="contribute-link" to={'/'}><h2>ASK TO CONTRIBUTE</h2></Link>
        </Nav>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route render={() => <div>Route does not exist!</div>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}
