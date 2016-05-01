import { createStore, applyMiddleware, combineReducers } from 'redux'
import { recipes, selectedRecipe } from '../reducers/ControlReducers.js'

import { Router, Route, browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger();
const reduxRouterMiddleware = routerMiddleware(browserHistory)

let initialState = {
  'recipes': [],
  'selectedRecipe': null
}

let controlStore = createStore(
  combineReducers({
    recipes: recipes,
    selectedRecipe: selectedRecipe,
    routing: routerReducer
  }),
  initialState,
  applyMiddleware(
    reduxRouterMiddleware,
    thunk,
    loggerMiddleware
  )
);

export default controlStore;
