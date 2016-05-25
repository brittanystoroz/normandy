import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ControlActions from '../actions/ControlActions.js'
import { reduxForm } from 'redux-form'
import composeRecipeContainer from './RecipeContainer.jsx'


class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    if (this.props.recipeId) {
      this.props.dispatch(ControlActions.makeApiRequest('updateRecipe', { recipe: values, recipeId: this.props.recipeId }));
    } else {
      this.props.dispatch(ControlActions.makeApiRequest('addRecipe', values));
    }
  }

  render() {
    const { fields: { name, filter_expression }, recipeId, handleSubmit, viewingRevision } = this.props;

    let approved = false;
    let approval_request_active = true;
    let recipeEnabled = true;

    return (
      <form onSubmit={handleSubmit(this.submitForm)} className="crud-form">
        { viewingRevision ?
          <p className="notification info">
            You are viewing a past version of this recipe. Saving this form will rollback the recipe to this revision.
          </p> : ''
        }
        <div className="row">
          <div className="fluid-3">
            <div className="row">
              <label>Name</label>
              <input type="text" field={name} {...name} />
            </div>
            <div className="row">
              <label>Filter Expression</label>
              <textarea field={filter_expression} {...filter_expression} />
            </div>
            <div className="row">
              <label>Action</label>
              <select>
                <option>Select an action</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="fluid-3">
            <label>Filter Expression</label>
            <textarea field={filter_expression} {...filter_expression} />
          </div>
        </div>
        <div className="row form-action-buttons">
          <div className="fluid-2">
            {recipeId ? <Link className="button delete" to={`/control/recipe/${recipeId}/delete/`}>Delete</Link> : ''}
          </div>
          <div className="fluid-2 float-right">
            <button className="button" type="submit">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}
RecipeForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
}

export default composeRecipeContainer(reduxForm({
    form: 'recipe',
    fields: ['name', 'filter_expression']
  }, (state, props) => {
    let selectedRecipeRevision = (props.location.state) ? props.location.state.selectedRevision : null;

    return {
      initialValues: selectedRecipeRevision || props.recipe,
      viewingRevision: ((selectedRecipeRevision || props.location.query.revisionId) ? true : false)
    }
  }
)(RecipeForm))
