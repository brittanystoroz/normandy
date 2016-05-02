import ControlAppReducers from '../../static/control/js/reducers/ControlAppReducers';

const fixtureRecipes = [
  { "id": 1, "name": "Lorem Ipsum", "enabled": true },
  { "id": 2, "name": "Dolor set amet", "enabled": true },
  { "id": 3, "name": "Consequitar adipscing", "enabled": false }
]

describe('reducers: recipeCollection reducer', () => {
  it('should return initial state by default', () => {
    expect(ControlAppReducers.recipeCollection(undefined, {})).toEqual({
      recipes: [],
      isFetching: false
    });
  })

  it('should handle FETCH_RECIPES', () => {
    expect(ControlAppReducers.recipeCollection(undefined, {
      type: 'FETCH_RECIPES'
    })).toEqual({
      recipes: [],
      isFetching: true
    })
  })

  it('should handle RECIPES_RECEIVED', () => {
    expect(ControlAppReducers.recipeCollection(undefined, {
      type: 'RECIPES_RECEIVED',
      recipes: fixtureRecipes
    })).toEqual({
      recipes: fixtureRecipes,
      isFetching: false
    })
  })

  it('should handle ADD_RECIPE', () => {
    expect(ControlAppReducers.recipeCollection(undefined, {
      type: 'ADD_RECIPE_TO_COLLECTION',
      recipe: {
        id: 5,
        name: 'Villis stebulum',
        enabled: false
      }
    })).toEqual({
        recipes: [{
          id: 5,
          name: 'Villis stebulum',
          enabled: false
        }],
        isFetching: false
      })
  })

  it('should handle REMOVE_RECIPE_FROM_COLLECTION', () => {
    expect(ControlAppReducers.recipeCollection({
      recipes: fixtureRecipes,
      isFetching: false
    }, {
      type: 'REMOVE_RECIPE_FROM_COLLECTION',
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
        }],
        isFetching: false
      })
  })
});

