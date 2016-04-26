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


export default {
  fetchAllRecipes,
};
