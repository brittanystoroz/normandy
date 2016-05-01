import { combineReducers } from 'redux'

import { REQUEST_RECIPES, RECIPES_LOADED, ADD_RECIPE, SET_SELECTED_RECIPE } from '../constants/ControlConstants.js';
import { LOCATION_CHANGE } from 'react-router-redux'

const initialHeaderState = {
  pageTitle: 'Recipes',
  subTitle: null,
  ctaButton: null
}

export function crud(state = 'list', action) {
  switch (action.type) {
    case 'LOCATION_CHANGE':
      console.log('location changed: ', action);
      return state;
      // if (action.locationPage === 'edit') {
      //   return Object.assign({}, state, {
      //     r
      //   })
    default:
      return state;
  }
}

export function recipes(state = [], action) {
  switch (action.type) {
    case RECIPES_LOADED:
      return action.recipes;
    case ADD_RECIPE:
      return Object.assign({}, state, {
        recipes: [
          ...state.recipes,
          action.recipe
        ]
      })
    default:
      return state;
  }
}

export function selectedRecipe(state = null, action) {
  switch (action.type) {
    case SET_SELECTED_RECIPE:
      console.log('setting selected recipe: ', action.recipe);
      return action.recipe;
    default:
      return state;
  }
}
