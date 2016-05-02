import apiFetch from '../utils/apiFetch.js';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const RECIPES_RECEIVED = 'RECIPES_RECEIVED';
export const ADD_RECIPE = 'ADD_RECIPE';
export const SET_SELECTED_RECIPE = 'SET_SELECTED_RECIPE';


function fetchRecipes() {
  return {
    type: FETCH_RECIPES,
  }
}

function recipesReceived(recipes) {
  return {
    type: RECIPES_RECEIVED,
    recipes: recipes,
  }
}

export function fetchAllRecipes() {
  return dispatch => {
    dispatch(fetchRecipes());

    return apiFetch('/api/v1/recipe/', {
      credentials: 'include',
    }).then(recipes => {
      dispatch(recipesReceived(recipes));
    });
  }
}

export function setSelectedRecipe(recipe) {
  return {
    type: SET_SELECTED_RECIPE,
    recipe: recipe
  }
}

export default {
  fetchAllRecipes,
  setSelectedRecipe,
};
