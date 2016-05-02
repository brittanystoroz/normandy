import apiFetch from '../utils/apiFetch.js';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const RECIPES_RECEIVED = 'RECIPES_RECEIVED';
export const ADD_RECIPE = 'ADD_RECIPE';
export const FETCH_SELECTED_RECIPE = 'FETCH_SELECTED_RECIPE';
export const SELECTED_RECIPE_RECEIVED = 'SELECTED_RECIPE_RECEIVED';
export const REMOVE_RECIPE_FROM_COLLECTION = 'REMOVE_RECIPE_FROM_COLLECTION';
export const RECIPE_DELETED = 'RECIPE_DELETED';


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

function fetchSelectedRecipe() {
  return {
    type: FETCH_SELECTED_RECIPE,
  }
}

function selectedRecipeReceived(recipe) {
  return {
    type: SELECTED_RECIPE_RECEIVED,
    recipe: recipe
  }
}

function removeRecipeFromCollection(recipeId) {
  return {
    type: REMOVE_RECIPE_FROM_COLLECTION,
    recipeId: recipeId
  }
}

function recipeDeleted() {
  return {
    type: RECIPE_DELETED
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

export function selectRecipe(recipeId) {
  if (recipeId) {
    return dispatch => {
      dispatch(fetchSelectedRecipe());

      return apiFetch(`/api/v1/recipe/${recipeId}/`, {
        credentials: 'include',
      }).then(recipe => {
        dispatch(selectedRecipeReceived(recipe));
      });
    }
  } else {
    return dispatch => {
      dispatch(selectedRecipeReceived(null));
    }
  }
}

export function deleteRecipe(recipeId) {
  return dispatch => {
    dispatch(removeRecipeFromCollection(recipeId));

    return apiFetch(`/api/v1/recipe/${recipeId}/`, {
        method: 'delete',
        credentials: 'include',
      }).then(recipe => {
        dispatch(recipeDeleted(recipe));
      });
  }
}

export default {
  fetchAllRecipes,
  selectRecipe,
  deleteRecipe,
};
