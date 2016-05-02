import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ControlActions from '../actions/ControlAppActions.js'
import { reduxForm } from 'redux-form'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { fields: { name }, handleSubmit } = this.props;
    let recipe = this.props.recipe;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" field={name} {...name} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    initialValues: state.selectedRecipe.recipe,
    recipe: state.selectedRecipe.recipe
  }
}

export default reduxForm({
  form: 'recipe',
  fields: ['name']
}, mapStateToProps)(RecipeForm)
