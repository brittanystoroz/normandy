import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { makeApiRequest, recipesReceived, setSelectedRecipe } from '../actions/ControlActions.js'

class RecipeDataRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { recipe, dispatch } = this.props;

    return (
      <tr key={recipe.id} onClick={(e) => {
        dispatch(setSelectedRecipe(recipe.id));
        dispatch(push(`/control/recipe/${recipe.id}/`))
      }}>
        <td>{recipe.name}</td>
        <td>{recipe.action_name}</td>
        <td>
          {(() => {
            switch(recipe.enabled) {
              case true: return <i className="fa fa-lg fa-check green">&nbsp;</i>;
              case false: return <i className="fa fa-lg fa-times red">&nbsp;</i>;
            }
          })()}
        </td>
        <td>{recipe.sample_rate}</td>
        <td>{recipe.release_channels}</td>
      </tr>
    )
  }
}


class RecipeList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, isFetching, recipeListNeedsFetch } = this.props;
    dispatch(setSelectedRecipe(null));

    if (recipeListNeedsFetch && !isFetching) {
      dispatch(makeApiRequest('fetchAllRecipes', {}))
      .then(recipes => {
        dispatch(recipesReceived(recipes));
      });
    }
  }

  render() {
    return (
      <div className="fluid-8">
        <table id="recipe-list">
          <thead>
            <tr>
              <td>Name</td>
              <td>Action</td>
              <td>Enabled</td>
              <td>Sample Rate</td>
              <td>Release Channels</td>
            </tr>
          </thead>
          <tbody>
            {
              this.props.recipes.map(recipe => {
                return (<RecipeDataRow recipe={recipe} dispatch={this.props.dispatch} key={recipe.id} />)
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    recipes: state.controlApp.recipes || [],
    dispatch: ownProps.dispatch,
    recipeListNeedsFetch: state.controlApp.recipeListNeedsFetch,
    isFetching: state.controlApp.isFetching
  }
}

export default connect(
  mapStateToProps
)(RecipeList)
