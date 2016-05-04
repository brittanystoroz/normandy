import apiFetch from '../utils/apiFetch.js';

export const REQUEST_IN_PROGRESS = 'REQUEST_IN_PROGRESS';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';

export const RECIPES_RECEIVED = 'RECIPES_RECEIVED';
export const SINGLE_RECIPE_RECEIVED = 'SELECTED_RECIPE_RECEIVED';

export const SET_SELECTED_RECIPE = 'SET_SELECTED_RECIPE';

export const RECIPE_UPDATED = 'RECIPE_UPDATED';
export const RECIPE_ADDED = 'RECIPE_ADDED';
export const RECIPE_DELETED = 'RECIPE_DELETED';


const BASE_API_URL = '/api/v1/recipe/';

const API_REQUEST_SETTINGS = {
  credentials: 'include',
  headers: {
    'X-CSRFToken': document.getElementsByTagName('html')[0].dataset.csrf
  }
};

const makeApiRequest = function(dispatch, options) {
  return apiFetch(options.url, {
    ...options.settings,
    ...API_REQUEST_SETTINGS
  })
  .then(response => {
    console.log('success: ', response);
    dispatch(requestComplete('success'));
    dispatch(options.actionOnSuccess(options.successActionParams || response));
  })
  .catch(err => {
    console.log('err: ', err);
    dispatch(requestComplete('failure'));
  });
};


function requestInProgress() {
  return {
    type: REQUEST_IN_PROGRESS
  }
}

function requestComplete(status) {
  return {
    type: REQUEST_COMPLETE,
    status: status
  }
}

function recipesReceived(recipes) {
  return {
    type: RECIPES_RECEIVED,
    recipes
  };
}

function singleRecipeReceived(recipe) {
  return {
    type: SINGLE_RECIPE_RECEIVED,
    recipe
  };
}

function setSelectedRecipe(recipeId) {
  return {
    type: SET_SELECTED_RECIPE,
    recipeId
  }
}

function recipeDeleted(recipeId) {
  return {
    type: RECIPE_DELETED,
    recipeId
  };
}

function recipeAdded(recipe) {
  return {
    type: RECIPE_ADDED,
    recipe
  };
}

function recipeUpdated(recipe) {
  return {
    type: RECIPE_UPDATED,
    recipe
  };
}



export function shouldFetchRecipes(state) {
  if (state.controlApp.recipeListNeedsFetch === true &&
      state.controlApp.isFetching === false) {
    return true;
  } else {
    return false;
  }
}


export function fetchAllRecipes() {
  return (dispatch, getState) => {
    if (shouldFetchRecipes(getState())) {
      let apiRequestConfig = {
        url: BASE_API_URL,
        settings: {
          method: 'get'
        },
        actionOnSuccess: recipesReceived
      }

      makeApiRequest(dispatch, apiRequestConfig);
    }
  };
}

export function fetchSingleRecipe(recipeId) {
  return dispatch => {
    let apiRequestConfig = {
      url: `${BASE_API_URL}${recipeId}/`,
      settings: {
        method: 'get'
      },
      actionOnSuccess: singleRecipeReceived
    }

    makeApiRequest(dispatch, apiRequestConfig);
  };
}

export function deleteRecipe(recipeId) {
  return dispatch => {
    let apiRequestConfig = {
      url: `${BASE_API_URL}${recipeId}/`,
      settings: {
        method: 'delete'
      },
      actionOnSuccess: recipeDeleted,
      successActionParams: recipeId
    }

    makeApiRequest(dispatch, apiRequestConfig);
  };
}

export function addRecipe(recipe) {
  return dispatch => {
    let apiRequestConfig = {
      url: BASE_API_URL,
      settings: {
        data: recipe,
        method: 'post'
      },
      actionOnSuccess: recipeAdded
    }

    makeApiRequest(dispatch, apiRequestConfig);
  };
}

export function updateRecipe(recipe, recipeId) {
  return dispatch => {
    dispatch(requestInProgress());
    let apiRequestConfig = {
      url: `${BASE_API_URL}${recipeId}/`,
      settings: {
        data: recipe,
        method: 'patch'
      },
      actionOnSuccess: recipeUpdated
    }

    makeApiRequest(dispatch, apiRequestConfig);
  };
}

export default {
  fetchAllRecipes,
  fetchSingleRecipe,
  setSelectedRecipe,
  deleteRecipe,
  addRecipe,
  updateRecipe,
};
