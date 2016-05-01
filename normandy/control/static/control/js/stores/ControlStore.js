import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import * as reducers from '../reducers/ControlReducers.js'
import { setSelectedRecipe, fetchAllRecipes } from '../actions/ControlActions.js'


import { Router, Route, browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux'

const loggerMiddleware = createLogger();
const reduxRouterMiddleware = routerMiddleware(browserHistory)

let initialState = {
  'recipes': [],
  'selectedRecipe': null
}

console.log('reducers: ', reducers);

let controlStore = createStore(
  combineReducers({
    recipes: reducers.recipes,
    selectedRecipe: reducers.selectedRecipe,
    header: reducers.header,
    routing: routerReducer
  }),
  initialState,
  applyMiddleware(
    reduxRouterMiddleware,
    thunk,
    loggerMiddleware
  )
);

console.log('Store State: ', controlStore.getState());

let unsubscribe = controlStore.subscribe(() =>
  console.log('STATE CHANGED: ', controlStore.getState())
)


// controlStore.dispatch(fetchAllRecipes())

// unsubscribe();

export default controlStore;
