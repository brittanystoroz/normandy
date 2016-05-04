import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ControlActions from '../actions/ControlAppActions.js'

class DeleteRecipe extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getRecipeData(this.props.recipeId);
  }

  render() {
    const { recipe, recipeId, dispatch } = this.props;
    if (recipe) {
      return (
        <div className="fluid-7">
          <form action="" className="crud-form">
            <p>Are you sure you want to delete "{recipe.name}"?</p>
            <div className="form-action-buttons">
              <div className="fluid-2 float-right">
                <input type="submit" value="Confirm" class="delete" onClick={(e) => {
                  dispatch(ControlActions.deleteRecipe(recipeId));
                  dispatch(push(`/control/`));
                }} />
              </div>
            </div>
          </form>
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
    recipe: recipeData,
    dispatch: props.dispatch
  };
}

DeleteRecipe.propTypes = {
  recipeId: React.PropTypes.number,
  recipe: React.PropTypes.object,
}

export default connect(
  mapStateToProps
)(DeleteRecipe)

