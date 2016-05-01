import { createStore, applyMiddleware, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { recipes, selectedRecipe } from '../reducers/ControlAppReducers.js'
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();
const reduxRouterMiddleware = routerMiddleware(browserHistory);

export default function controlStore(initialState) {
  return createStore(
    combineReducers({
      recipes: recipes,
      selectedRecipe: selectedRecipe,
      routing: routerReducer
    }),
    initialState,
    applyMiddleware(
      reduxRouterMiddleware,
      loggerMiddleware
    )
  )
}
