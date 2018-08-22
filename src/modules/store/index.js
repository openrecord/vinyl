import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {createEpicMiddleware} from 'redux-observable';

import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import history from '../routes/history';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

// Creates Middleware
const epicMiddleware = createEpicMiddleware();

const middleware = applyMiddleware(epicMiddleware, thunk, routerMiddleware(history), logger);
const composeEnhancers = composeWithDevTools({});

// Creates store
const store = createStore(connectRouter(history)(rootReducer), composeEnhancers(middleware));

// Kicks off observable co-process
epicMiddleware.run(rootEpic);

// Hot loading
if (module.hot) {
	module.hot.accept('./rootReducer', () => store.replaceReducer(connectRouter(history)(require('./rootReducer').default)));
}

export default store;
