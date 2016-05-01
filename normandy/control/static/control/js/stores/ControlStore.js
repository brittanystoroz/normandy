import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import controlApp from '../reducers/ControlReducers.js'
import { setSelectedRecipe, fetchAllRecipes } from '../actions/ControlActions.js'

const loggerMiddleware = createLogger()

let initialState = {
  'recipes': [],
  'selectedRecipe': null
}

let controlStore = createStore(
  controlApp,
  initialState,
  applyMiddleware(
    thunk,
    loggerMiddleware
  )
);

console.log('Store State: ', controlStore.getState());

let unsubscribe = controlStore.subscribe(() =>
  console.log('State changed: ', controlStore.getState())
)


// controlStore.dispatch(fetchAllRecipes())

unsubscribe();
