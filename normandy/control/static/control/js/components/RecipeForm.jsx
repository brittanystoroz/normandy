import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ControlActions from '../actions/ControlAppActions.js'
import { reduxForm } from 'redux-form'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fields: { name }, id, handleSubmit, submitForm } = this.props;
    return (
      <form onSubmit={handleSubmit(submitForm)} className="crud-form">
        <div className="row">
          <div className="fluid-3">
            <label>Name</label>
            <input type="text" field={name} {...name} />
          </div>
        </div>
        <div className="row form-action-buttons">
          <div className="fluid-2">
            <Link className="button delete" to={`/control/recipe/${id}/delete`}>Delete</Link>
          </div>
          <div className="fluid-2 float-right">
            <button className="button" type="submit">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    id: ((state.selectedRecipe.recipe) ? state.selectedRecipe.recipe.id : null),
    initialValues: state.selectedRecipe.recipe,
    submitForm: props.submitHandler,
  }
}

export default reduxForm({
  form: 'recipe',
  fields: ['name']
}, mapStateToProps)(RecipeForm)
