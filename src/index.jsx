import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import rootReducer from './modules/common/rootReducer';
import HealthContainer from './modules/health/HealthContainer';

const composeEnhancers = composeWithDevTools({});
const middleware = applyMiddleware(thunk);

const store = createStore(rootReducer, composeEnhancers(middleware));

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <HealthContainer />
    </Provider>,
    document.getElementById('root')
  );
};

render();
