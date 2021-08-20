import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { createStore, applyMiddleware, compose } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import reducers from "./reducers";
import Store from './Store'
// const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById("root")
);
