import apiFetch from '../utils/apiFetch.js';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const RECIPES_RECEIVED = 'RECIPES_RECEIVED';
export const FETCH_SELECTED_RECIPE = 'FETCH_SELECTED_RECIPE';
export const SELECTED_RECIPE_RECEIVED = 'SELECTED_RECIPE_RECEIVED';
export const REMOVE_RECIPE_FROM_COLLECTION = 'REMOVE_RECIPE_FROM_COLLECTION';
export const RECIPE_DELETED = 'RECIPE_DELETED';
export const ADD_RECIPE_TO_COLLECTION = 'ADD_RECIPE_TO_COLLECTION';
export const RECIPE_ADDED = 'RECIPE_ADDED';
export const UPDATE_RECIPE_IN_COLLECTION = 'UPDATE_RECIPE_IN_COLLECTION';
export const RECIPE_UPDATED = 'RECIPE_UPDATED';


function fetchRecipes() {
  return {
    type: FETCH_RECIPES,
  };
}

function recipesReceived(recipes) {
  return {
    type: RECIPES_RECEIVED,
    recipes: recipes,
  };
}

function fetchSelectedRecipe() {
  return {
    type: FETCH_SELECTED_RECIPE,
  };
}

function selectedRecipeReceived(recipe) {
  return {
    type: SELECTED_RECIPE_RECEIVED,
    recipe: recipe
  };
}

function removeRecipeFromCollection(recipeId) {
  return {
    type: REMOVE_RECIPE_FROM_COLLECTION,
    recipeId: recipeId
  };
}

function recipeDeleted() {
  return {
    type: RECIPE_DELETED
  };
}

function addRecipeToCollection(recipe) {
  return {
    type: ADD_RECIPE_TO_COLLECTION,
    recipe: recipe
  };
}

function recipeAdded(recipe) {
  return {
    type: RECIPE_ADDED,
    recipe: recipe
  };
}

function updateRecipeInCollection(recipe) {
  return {
    type: UPDATE_RECIPE_IN_COLLECTION,
    recipe
  };
}

function recipeUpdated(recipe) {
  return {
    type: RECIPE_UPDATED,
    recipe: recipe
  };
}

export function shouldFetchRecipes(state) {
  if (state.recipeCollection.recipes.length === 0) {
    return true;
  } else if (state.recipeCollection.recipes.isFetching) {
    return false;
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
  };
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
    };
  } else {
    return dispatch => {
      dispatch(selectedRecipeReceived(null));
    };
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
  };
}

export function addRecipe(recipe) {
  return dispatch => {
    dispatch(addRecipeToCollection(recipe));

    return apiFetch('/api/v1/recipe/', {
      method: 'post',
      credentials: 'include',
    }).then(recipe => {
      dispatch(recipeAdded(recipe));
    });
  };
}

export function updateRecipe(recipe) {
  return dispatch => {
    dispatch(updateRecipeInCollection(recipe));

    return apiFetch(`/api/v1/recipe/${recipe.id}/`, {
      method: 'put',
      credentials: 'include',
    }).then(recipe => {
      dispatch(recipeUpdated(recipe));
    });
  };
}

export default {
  fetchAllRecipes,
  selectRecipe,
  deleteRecipe,
  addRecipe,
  updateRecipe,
};
