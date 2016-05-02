import {
  FETCH_RECIPES, RECIPES_RECEIVED, ADD_RECIPE,
  FETCH_SELECTED_RECIPE, SELECTED_RECIPE_RECEIVED,
  REMOVE_RECIPE_FROM_COLLECTION, RECIPE_DELETED } from '../actions/ControlAppActions.js';

const initialRecipesState = {
  recipes: [], isFetching: false
}

const initialSelectedRecipeState = {
  recipe: null, isFetching: false, isDirty: false
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
    case REMOVE_RECIPE_FROM_COLLECTION:
      return Object.assign({}, state, {
        recipes: state.recipes.filter((recipe) => {
          return recipe.id !== action.recipeId
        })
      })
    default:
      return state;
  }
}

export function selectedRecipe(state = initialSelectedRecipeState, action) {
  switch (action.type) {
    case FETCH_SELECTED_RECIPE:
      return Object.assign({}, state, {
        isFetching: true
      })
    case SELECTED_RECIPE_RECEIVED:
      return Object.assign({}, state, {
        recipe: action.recipe,
        isFetching: false
      })
    case RECIPE_DELETED:
      return Object.assign({}, state, {
        recipe: null,
        isFetching: false
      })
    default:
      return state;
  }
}

export default {
  recipeCollection,
  selectedRecipe,
}
