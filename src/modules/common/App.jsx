import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import HomeContainer from '../home/HomeContainer';
import HealthContainer from '../health/HealthContainer';

// Import common styles
import './styles/base.scss';

export default function App({history}) {
  return (
    <ConnectedRouter history={history}>
      <div>
        <nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/health'}>Health</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/health" component={HealthContainer} />
          <Route render={() => <div>Route does not exist!</div>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}
