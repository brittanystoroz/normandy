import { FETCH_RECIPES, RECIPES_RECEIVED, ADD_RECIPE, SET_SELECTED_RECIPE } from '../actions/ControlAppActions.js';

const initialRecipesState = {
  recipes: [], isFetching: false
}

export function recipeCollection(state = initialRecipesState, action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECIPES_RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        recipes: action.recipes
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

export function selectedRecipe(state = null, action) {
  switch (action.type) {
    case SET_SELECTED_RECIPE:
      return action.recipe;
    default:
      return state;
  }
}

export default {
  recipeCollection,
  selectedRecipe,
}
