import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import routes from './routes';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import controlApp from './reducers/ControlReducers.js'
import ControlActions from './actions/ControlActions.js'

import ControlApp from './components/ControlApp.jsx';

import controlStore from './stores/ControlStore.js'

const history = syncHistoryWithStore(browserHistory, controlStore)


history.listen((location) => controlStore.dispatch(ControlActions.routeLocationDidUpdate(location)));

ReactDOM.render(<Provider store={controlStore}><Router history={history}>{routes}</Router></Provider>, document.querySelector('#content'));

