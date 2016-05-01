import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes';
import controlStore from './stores/ControlStore.js'

const history = syncHistoryWithStore(browserHistory, controlStore)

ReactDOM.render(
  <Provider store={controlStore}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.querySelector('#page-container')
);

