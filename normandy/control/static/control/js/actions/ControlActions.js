import { REQUEST_RECIPES, RECIPES_LOADED, ADD_RECIPE, REQUEST_SINGLE_RECIPE, SINGLE_RECIPE_LOADED, SET_SELECTED_RECIPE } from '../constants/ControlConstants.js';
import apiFetch from '../utils/apiFetch.js';

export function routeLocationDidUpdate(location) {
  return {
    type: 'LOCATION_CHANGE',
    location: location
  }
}
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
  console.log('requesting single recipe');
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
  console.log('fetching single recipe: ', recipeId);
  return dispatch => {
    dispatch(setSelectedRecipe({
      id: recipeId
    }));

    return apiFetch(`/api/v1/recipe/${recipeId}/`, {
      credentials: 'include',
    }).then(recipe => {
      console.log("fetched!");
      dispatch(setSelectedRecipe(recipe));
    });
  }
}

export function deleteRecipe(recipeId) {
  console.log('deleting recipe: ', recipeId);

}


export default {
  fetchAllRecipes,
  fetchSingleRecipe,
  deleteRecipe,
  setSelectedRecipe,
  routeLocationDidUpdate,
};
