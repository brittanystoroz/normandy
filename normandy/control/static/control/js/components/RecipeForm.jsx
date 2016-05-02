import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ControlActions from '../actions/ControlAppActions.js'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let recipe = this.props.recipe;
    if (recipe) {
      return (
        <div>
          <div className="fluid-8">pre-filled form to edit recipe {recipe.name}</div>
          <Link className="button delete" to={`/control/recipe/${recipe.id}/delete`}>Delete</Link>
        </div>
      )
    } else {
      return (
        <div>
          <div className="fluid-8">blank form to add new recipe :)</div>
        </div>
      )
    }
  }
}

export default RecipeForm
