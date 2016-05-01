import { REQUEST_RECIPES, RECIPES_LOADED, ADD_RECIPE, SET_SELECTED_RECIPE } from '../constants/ControlConstants.js';
import apiFetch from '../utils/apiFetch.js';

export function setSelectedRecipe(recipeId) {
  return {
    type: SET_SELECTED_RECIPE,
    recipeId: recipeId
  }
}

export function addRecipe(recipe) {
  return {
    type: ADD_RECIPE,
    recipe
  }
}

function requestRecipes() {
  return {
    type: REQUEST_RECIPES,
  }
}

function recipesLoaded(recipes) {
  return {
    type: RECIPES_LOADED,
    recipes: recipes,
  }
}

export function fetchAllRecipes() {
  return dispatch => {
    dispatch(requestRecipes());

    return apiFetch('/api/v1/recipe/', {
      credentials: 'include',
    }).then(recipes => {
      dispatch(recipesLoaded(recipes));
    });
  }
}

export function fetchSingleRecipe(recipeId) {
  apiFetch(`/api/v1/recipe/${recipeId}/`, {
    credentials: 'include',
  }).then(recipe => {
    Dispatcher.dispatch({
      type: SELECTED_RECIPE_LOADED,
      recipe,
    });
  });
}

export function deleteRecipe(recipeId) {
  console.log('deleting recipe: ', recipeId);

}


export default {
  fetchAllRecipes,
  fetchSingleRecipe,
  deleteRecipe,
};
