import Dispatcher from '../utils/Dispatcher.js';
import {actionTypes} from '../constants/ControlConstants.js';
import apiFetch from '../utils/apiFetch.js';


export function fetchAllRecipes() {
  apiFetch('/api/v1/recipe/', {
    credentials: 'include',
  }).then(recipes => {
    Dispatcher.dispatch({
      type: actionTypes.RECIPES_LOADED,
      recipes,
    });
  });
}

export function fetchSingleRecipe(recipeId) {
  apiFetch(`/api/v1/recipe/${recipeId}/`, {
    credentials: 'include',
  }).then(recipe => {
    Dispatcher.dispatch({
      type: actionTypes.SELECTED_RECIPE_LOADED,
      recipe,
    });
  });
}


export default {
  fetchAllRecipes,
  fetchSingleRecipe,
};
