import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk"; //Used to dispatch actions as functions
import reducers from "./store/index";
import RegisterContainer from "./modules/register/RegisterContainer.jsx";

require("./stylesheets/base.scss");

let store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <RegisterContainer/>
  </Provider>,
  document.getElementById("app")
);

