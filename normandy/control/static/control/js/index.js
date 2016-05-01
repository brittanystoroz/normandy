import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import controlApp from './reducers/ControlReducers.js'

import ControlApp from './components/ControlApp.jsx';

let store = createStore(
  controlApp,
  applyMiddleware(
    thunk
  )
);

ReactDOM.render(<Provider store={store}><Router history={browserHistory}>{routes}</Router></Provider>, document.querySelector('#content'));

