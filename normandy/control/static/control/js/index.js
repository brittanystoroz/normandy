import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import controlStore from './stores/ControlStore.js'
import ControlAppRoutes from './routes.js'

import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

const store = controlStore({
  recipeCollection: {
    recipes: [],
    isFetching: false,
  },
  selectedRecipe: {
    recipe: null,
    isFetching: false,
    isDirty: false
  }
});

const history = syncHistoryWithStore(browserHistory, store);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          {ControlAppRoutes}
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.querySelector('#page-container'));

