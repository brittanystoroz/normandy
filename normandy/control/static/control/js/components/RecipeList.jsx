import React from 'react'
import { connect } from 'react-redux'
import ControlActions from '../actions/ControlAppActions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    recipes: state.recipeCollection.recipes,
    isFetching: state.recipeCollection.isFetching
  }
}

class RecipeDataRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let recipe = this.props.recipe;

    return (
      <tr key={recipe.id}>
        <td>{recipe.name}</td>
        <td>{recipe.action ? recipe.action.name : 'No action set'}</td>
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

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(ControlActions.fetchAllRecipes());
    dispatch(ControlActions.setSelectedRecipe(null));
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
                return (<RecipeDataRow editRecipe={this.props.editRecipe} recipe={recipe} key={recipe.id} />)
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(RecipeList)
