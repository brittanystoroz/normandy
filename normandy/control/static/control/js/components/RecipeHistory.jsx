import React from 'react'
import { connect } from 'react-redux'
import ControlActions from '../actions/ControlAppActions.js'

class RecipeHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getRecipeData(this.props.recipeId);
  }

  render() {
    const { recipe } = this.props;
    if (recipe) {
      return (
        <div className="fluid-7">
          {recipe.name}
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state, props) => {
  let recipeData = null;
  if (state.controlApp.recipes) {
    recipeData = state.controlApp.recipes.find(recipe => {
      return recipe.id === state.controlApp.selectedRecipe;
    });
  }

  return {
    recipeId: state.controlApp.selectedRecipe || parseInt(props.routeParams.id) || null,
    recipe: recipeData
  };
}

RecipeHistory.propTypes = {
  recipeId: React.PropTypes.number,
  recipe: React.PropTypes.object,
}

export default connect(
  mapStateToProps
)(RecipeHistory)

