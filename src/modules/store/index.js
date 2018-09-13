import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import history from '../routes/history';
import rootReducer from './rootReducer';

const middleware = applyMiddleware(routerMiddleware(history), logger);
const composeEnhancers = composeWithDevTools({});

// Creates store
const store = createStore(connectRouter(history)(rootReducer), composeEnhancers(middleware));

// Hot loading
if (module.hot) {
	module.hot.accept('./rootReducer', () => store.replaceReducer(connectRouter(history)(require('./rootReducer').default)));
}

export default store;
