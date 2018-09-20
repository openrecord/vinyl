import './styles/boot.scss';

import React from 'react';
import {ApolloProvider} from 'react-apollo';
import ReactDOM from 'react-dom';

import App from './modules/common/App';
import client from './modules/apollo';

// -------------------
// Load the Redux App
// -------------------
const MOUNT_NODE = document.getElementById('root');

function render(App) {
	ReactDOM.render(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>,
		MOUNT_NODE
	);
}

render(App);

if (module.hot) {
	// Hot reloadable React components and translation json files
	// modules.hot.accept does not accept dynamic dependencies,
	// have to be constants at compile-time
	module.hot.accept(['./modules/common/App.jsx'], () =>
		render(require('./modules/common/App.jsx').default)
	);
}
