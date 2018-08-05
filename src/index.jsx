import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

import App from './modules/common/App';
import rootReducer from './modules/common/rootReducer';

// -------------------
// Load the Redux App
// -------------------
const MOUNT_NODE = document.getElementById('root');
configureStoreAndRender();
// -------------------

// Supporting Functions

function configureStoreAndRender() {
	const history = createBrowserHistory();
	const middleware = applyMiddleware(thunk, routerMiddleware(history));
	const composeEnhancers = composeWithDevTools({});
	const store = createStore(connectRouter(history)(rootReducer), composeEnhancers(middleware));

	if (module.hot) {
		// Hot reloadable React components and translation json files
		// modules.hot.accept does not accept dynamic dependencies,
		// have to be constants at compile-time
		module.hot.accept(['./modules/common/App'], () => {
			ReactDOM.unmountComponentAtNode(MOUNT_NODE);
			const NextApp = require('./modules/common/App').default; // Must re-import the app in order for the re-rendering to take place.
			render(NextApp);
		});

		module.hot.accept(['./modules/common/rootReducer'], () => {
			const nextReducer = require('./modules/common/rootReducer').default; // Re-import the reducer if it was changed.
			//TODO: (when replacing connected-react-router) Maybe reconnect router with connectRouter(history)(rootReducer)?
			store.replaceReducer(nextReducer);
		});
	}

	render(App);

	function render(App) {
		ReactDOM.render(
			<Provider store={store}>
				<App history={history} />
			</Provider>,
			MOUNT_NODE
		);
	}
}
