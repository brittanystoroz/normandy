import BaseStore from './BaseStore.js';
import Dispatcher from '../Dispatcher.js';
import {actionTypes, headerDetails} from '../constants/ControlConstants.js';

let _selectedRecipe = null;

let _state = {
  'selectedRecipe': null,
  'recipes': [],
  'recipeAction': null
}

class _ControlStore extends BaseStore {
  getSelectedRecipe() {
    return Object.assign({}, _selectedRecipe);
  }

  getRecipes() {
    return _state.recipes
  }

  getState() {
    return _state;
  }

  getCurrentAction() {
    return _state.recipeAction
  }
}

function updateState(action) {
  if (!_selectedRecipe || _selectedRecipe === null) {
    _state.selectedRecipe = null;
  }

  if (_selectedRecipe) {
    _state.selectedRecipe = _selectedRecipe.id;
  }

  if (action.recipes) {
    _state.recipes = action.recipes;
  }

  _state.recipeAction = action.type;
}



// Stores are singletons.
const ControlStore = new _ControlStore();

ControlStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case actionTypes.EDIT_RECIPE:
      _selectedRecipe = action.recipe;
      updateState(action);
      ControlStore.emitChange();
      break;

    case actionTypes.RECIPES_LOADED:
      updateState(action);
      ControlStore.emitChange();
      break;

    default:
      // do nothing
  }
});

export default ControlStore;
