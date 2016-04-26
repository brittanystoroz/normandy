import constantMap from '../utils/constantMap.js';

export const actionTypes = constantMap([
  'FETCH_ALL_RECIPES',
  'RECIPES_LOADED',
  'EDIT_RECIPE',
  'ADD_RECIPE',
  'DELETE_RECIPE',
  'VIEW_RECIPE_HISTORY',
  'LOGIN',
  'LOGOUT',
]);

export const recipeEditState = constantMap([
  'INVALID',
  'VALID',
  'SUCCESS',
  'ERROR',
]);

export default {actionTypes, recipeEditState};
