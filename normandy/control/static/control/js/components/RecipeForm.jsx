import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ControlActions from '../actions/ControlAppActions.js'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props
    let currentRecipe = this.props.recipe || this.props.routeParams;
    dispatch(ControlActions.selectRecipe(currentRecipe.id));
  }

  render() {
    let recipe = this.props.recipe;
    if (recipe) {
      return (
        <div>
          <div className="fluid-8">{recipe.name}</div>
          <Link className="button delete" to={`/control/recipe/${recipe.id}/delete`}>Delete</Link>
        </div>
      )
    } else {
      return null
    }
  }
}

let mapStateToProps = (state) => {
  return {
    recipe: state.selectedRecipe.recipe,
    isFetching: state.selectedRecipe.isFetching
  }
}

RecipeForm.propTypes = {
  recipe: React.PropTypes.object,
}

export default connect(
  mapStateToProps
)(RecipeForm)
