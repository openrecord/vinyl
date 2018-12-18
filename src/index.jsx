import './styles/boot.scss';

import * as React from 'react';
import {ApolloProvider} from 'react-apollo';
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks';
import * as ReactDOM from 'react-dom';
import {setConfig} from 'react-hot-loader';

import client from './modules/apollo';
import App from './modules/common/App';
import StoreProvider from './modules/store';

// -------------------
// Load the Redux App
// -------------------
setConfig({pureSFC: true});
const MOUNT_NODE = document.getElementById('root');

function render(App) {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ApolloHooksProvider>
    </ApolloProvider>,
    MOUNT_NODE
  );
}

render(App);

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./modules/common/App.tsx'], () =>
    render(require('./modules/common/App.tsx').default)
  );
}
