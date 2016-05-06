import controlAppReducers from '../../static/control/js/reducers/ControlAppReducers';
import * as actions from '../../static/control/js/actions/ControlAppActions';

const initialState = {
  recipes: null,
  isFetching: false,
  selectedRecipe: null,
  recipeListNeedsFetch: true
};

const fixtureRecipes = [
  { "id": 1, "name": "Lorem Ipsum", "enabled": true },
  { "id": 2, "name": "Dolor set amet", "enabled": true },
  { "id": 3, "name": "Consequitar adipscing", "enabled": false }
];

describe('controlApp reducer', () => {
  it('should return initial state by default', () => {
    expect(controlAppReducers(undefined, {})).toEqual(initialState);
  })

  it('should handle REQUEST_IN_PROGRESS', () => {
    expect(controlAppReducers(undefined, {
      type: actions.REQUEST_IN_PROGRESS
    })).toEqual({
      ...initialState,
      isFetching: true
    })
  })

  it('should handle REQUEST_COMPLETE', () => {
    expect(controlAppReducers(undefined, {
      type: actions.REQUEST_COMPLETE,
    })).toEqual({
      ...initialState,
      isFetching: false
    })
  })

  it('should handle RECIPES_RECEIVED', () => {
    expect(controlAppReducers(undefined, {
      type: actions.RECIPES_RECEIVED,
      recipes: fixtureRecipes
    })).toEqual({
      ...initialState,
      recipes: fixtureRecipes,
      recipeListNeedsFetch: false
    })
  })

  it('should handle SINGLE_RECIPE_RECEIVED', () => {
    expect(controlAppReducers(undefined, {
      type: actions.SINGLE_RECIPE_RECEIVED,
      recipe: fixtureRecipes[0]
    })).toEqual({
      ...initialState,
      recipes: [fixtureRecipes[0]],
      recipeListNeedsFetch: true,
      selectedRecipe: 1
    })
  })

  it('should handle SET_SELECTED_RECIPE', () => {
    expect(controlAppReducers(undefined, {
      type: actions.SET_SELECTED_RECIPE,
      recipeId: 2
    })).toEqual({
      ...initialState,
      selectedRecipe: 2
    })
  })

  it('should handle RECIPE_ADDED', () => {
    expect(controlAppReducers(initialState, {
      type: actions.RECIPE_ADDED,
      recipe: {
        id: 4,
        name: 'Villis stebulum',
        enabled: false
      }
    })).toEqual({
      ...initialState,
      recipes: [{
        id: 4,
        name: 'Villis stebulum',
        enabled: false
      }]
    })
  })

  it('should handle RECIPE_DELETED', () => {
    expect(controlAppReducers({ recipes: fixtureRecipes }, {
      type: actions.RECIPE_DELETED,
      recipeId: 3
    })).toEqual({
      recipes: [{
        "id": 1,
        "name": "Lorem Ipsum",
        "enabled": true
      },
      {
        "id": 2,
        "name": "Dolor set amet",
        "enabled": true
      }]
    })
  })

  it('should handle RECIPE_UPDATED', () => {
    expect(controlAppReducers({ recipes: fixtureRecipes }, {
      type: actions.RECIPE_UPDATED,
      recipe: {
        id: 3,
        name: "Updated recipe name",
        enabled: true
      }
    })).toEqual({
      recipes: [{
        "id": 1,
        "name": "Lorem Ipsum",
        "enabled": true
      },
      {
        "id": 2,
        "name": "Dolor set amet",
        "enabled": true
      },
      {
        id: 3,
        name: "Updated recipe name",
        enabled: true
      }]
    })
  })
});

