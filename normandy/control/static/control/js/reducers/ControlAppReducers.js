export function recipes(state = [], action) {
  switch (action.type) {
    case 'RECIPES_LOADED':
      return action.recipes;
    default:
      return state;
  }
}

export function selectedRecipe(state = null, action) {
  switch (action.type) {
    case 'SET_SELECTED_RECIPE':
      return action.recipe;
    default:
      return state;
  }
}
