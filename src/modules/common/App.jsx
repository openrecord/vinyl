import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import HomeContainer from '../home/HomeContainer';

// Import common styles
import './styles/base.scss';

export default function App({history}) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route render={() => <div>Route does not exist!</div>} />
      </Switch>
    </ConnectedRouter>
  );
}
