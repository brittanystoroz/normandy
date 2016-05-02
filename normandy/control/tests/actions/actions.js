import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../static/control/js/actions/ControlAppActions'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  recipeCollection: {
    recipes: []
  }
});

describe('actions: recipe fetch', () => {
  it('creates RECIPES_RECEIVED when fetching recipes is successful', () => {
    const expectedActions = [
      { type: actions.FETCH_RECIPES },
      { type: actions.RECIPES_RECEIVED, recipes: [
          {
            id: 1,
            name: 'Lorem Ipsum',
            enabled: true
          }, {
            id: 2,
            name: 'Dolor set amet',
            enabled: true
          }, {
            id: 3,
            name: 'Consequitar adipscing',
            enabled: false
          }
        ]
      }
    ]

    return store.dispatch(actions.fetchAllRecipes())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
