import BaseStore from './BaseStore.js';
import Dispatcher from '../utils/Dispatcher.js';
import {actionTypes} from '../constants/ControlConstants.js';

let selectedRecipe = null;
let recipes = [];

class _ControlStore extends BaseStore {
  getSelectedRecipe() {
    return Object.assign({}, selectedRecipe);
  }

  getRecipes() {
    return recipes.slice(0);
  }
}

// Stores are singletons.
const ControlStore = new _ControlStore();

ControlStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case actionTypes.RECIPES_LOADED:
      recipes = action.recipes;
      ControlStore.emitChange();
      break;

    case actionTypes.SELECTED_RECIPE_LOADED:
      selectedRecipe = action.recipe;
      ControlStore.emitChange();
      break;

    default:
      // do nothing
  }
});

export default ControlStore;
