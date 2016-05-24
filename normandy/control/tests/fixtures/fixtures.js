export const fixtureRecipes = [
  { "id": 1, "name": "Lorem Ipsum", "enabled": true },
  { "id": 2, "name": "Dolor set amet", "enabled": true },
  { "id": 3, "name": "Consequitar adipscing", "enabled": false }
];

export const initialState = {
    recipes: null,
    isFetching: false,
    selectedRecipe: null,
    recipeListNeedsFetch: true,
    notification: null
};
