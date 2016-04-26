/* globals _:false */
import Dispatcher from '../Dispatcher.js';
import {actionTypes} from '../constants/ControlConstants.js';
import apiFetch from '../utils/apiFetch.js';



const remoteTroubleshooting = window.remoteTroubleshooting;

export function editRecipe(recipe) {
  Dispatcher.dispatch({
    type: actionTypes.EDIT_RECIPE,
    recipe,
  });
}

export function fetchAllRecipes() {
  apiFetch('/api/v1/recipe/', {
    credentials: 'include',
  }).then(data => {
    return data.json()
  }).then(recipes => {
      Dispatcher.dispatch({
        type: actionTypes.RECIPES_LOADED,
        recipes,
      });
  });
}


export default {
  editRecipe,
  fetchAllRecipes,
};
