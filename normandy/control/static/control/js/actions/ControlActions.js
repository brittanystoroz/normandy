import { REQUEST_RECIPES, RECIPES_LOADED, ADD_RECIPE, REQUEST_SINGLE_RECIPE, SET_SELECTED_RECIPE } from '../constants/ControlConstants.js';
import apiFetch from '../utils/apiFetch.js';


export function setSelectedRecipe(recipe) {
  return {
    type: SET_SELECTED_RECIPE,
    recipe: recipe
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

function requestSingleRecipe() {
  return {
    type: REQUEST_SINGLE_RECIPE,
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
  return dispatch => {
    dispatch(setSelectedRecipe({
      id: recipeId
    }));

    return apiFetch(`/api/v1/recipe/${recipeId}/`, {
      credentials: 'include',
    }).then(recipe => {
      dispatch(setSelectedRecipe(recipe));
    });
  }
}

export function deleteRecipe(recipe) {
  return apiFetch(`/api/v1/recipe/${recipe.id}/`, {
      method: 'delete'
    }).then(recipe => {
      dispatch(setSelectedRecipe(null));
    });
}

export function updateRecipe(recipe) {
  console.log('updating recipe from control actions!');
}


export default {
  fetchAllRecipes,
  fetchSingleRecipe,
  deleteRecipe,
  setSelectedRecipe,
  updateRecipe,
};
