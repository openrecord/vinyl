import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import axios from 'axios';

import App from './modules/common/App';
import store from './modules/store';
import history from './modules/routes/history';

// Send all requests with session cookie information.
axios.defaults.withCredentials = true;

// -------------------
// Load the Redux App
// -------------------
const MOUNT_NODE = document.getElementById('root');

function render(App) {
	ReactDOM.render(
		<Provider store={store}>
			<App history={history} />
		</Provider>,
		MOUNT_NODE
	);
}

render(App);

if (module.hot) {
	// Hot reloadable React components and translation json files
	// modules.hot.accept does not accept dynamic dependencies,
	// have to be constants at compile-time
	module.hot.accept(['./modules/common/App.jsx'], () => render(require('./modules/common/App.jsx').default));
}
