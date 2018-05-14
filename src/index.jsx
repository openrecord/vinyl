import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk        from 'redux-thunk'; //Used to dispatch actions as functions
import reducers     from './store/reducers';

import Header      from './components/Header.jsx'

require('./stylesheets/base.scss');



let store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <div className="main">
      <Header/>
    </div>
  </Provider>, 
  document.getElementById("app")
);

