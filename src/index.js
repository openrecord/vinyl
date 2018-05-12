import React from "react";
import ReactDOM from "react-dom";

require('./stylesheets/base.scss');

const Index = () => {
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));
``
