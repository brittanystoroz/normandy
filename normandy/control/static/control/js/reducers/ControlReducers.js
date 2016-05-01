import { REQUEST_RECIPES, RECIPES_LOADED, ADD_RECIPE, SET_SELECTED_RECIPE } from '../constants/ControlConstants.js';

const initialState = {
  selectedRecipe: null,
  recipes: []
}

export default function controlApp(state = initialState, action) {
  switch (action.type) {
    case RECIPES_LOADED:
      return Object.assign({}, state, {
        recipes: action.recipes,
      })
    case SET_SELECTED_RECIPE:
      return Object.assign({}, state, {
        selectedRecipe: action.recipeId
      })
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
