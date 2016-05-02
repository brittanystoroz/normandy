import ControlAppReducers from '../../static/control/js/reducers/ControlAppReducers'

describe('reducers: selectedRecipe reducer', () => {
  it('should return initial state by default', () => {
    expect(ControlAppReducers.selectedRecipe(undefined, {})).toEqual({
      recipe: null,
      isFetching: false,
      isDirty: false
    });
  })

  it('should handle FETCH_SELECTED_RECIPE', () => {
    expect(ControlAppReducers.selectedRecipe(undefined, {
      type: 'FETCH_SELECTED_RECIPE'
    })).toEqual({
      recipe: null,
      isFetching: true,
      isDirty: false
    })
  })

  it('should handle SELECTED_RECIPE_RECEIVED', () => {
    expect(ControlAppReducers.selectedRecipe(undefined, {
      type: 'SELECTED_RECIPE_RECEIVED',
      recipe: {
        id: 7
      }
    })).toEqual({
      recipe: {
        id: 7
      },
      isFetching: false,
      isDirty: false
    })
  })

  it('should handle RECIPE_DELETED', () => {
    expect(ControlAppReducers.selectedRecipe(undefined, {
      type: 'RECIPE_DELETED'
    })).toEqual({
      recipe: null,
      isFetching: false,
      isDirty: false
    })
  })
});
