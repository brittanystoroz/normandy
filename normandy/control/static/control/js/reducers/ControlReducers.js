import { RECIPES_LOADED, ADD_RECIPE, SET_SELECTED_RECIPE } from '../constants/ControlConstants.js';


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
      return action.recipe;
    default:
      return state;
  }
}
