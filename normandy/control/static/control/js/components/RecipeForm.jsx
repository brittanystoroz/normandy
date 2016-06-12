import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { destroy, reduxForm, getValues } from 'redux-form'

import { makeApiRequest, recipeUpdated, recipeAdded } from '../actions/ControlActions.js'
import composeRecipeContainer from './RecipeContainer.jsx'
import ActionForm from './ActionForm.jsx'
import FormField from './form_fields/FormFieldWrapper.jsx';

export class RecipeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableActions: ['console-log', 'show-heartbeat'],
      selectedAction: null,
    };
  }

  changeAction(event) {
    const { dispatch, fields } = this.props;
    let selectedActionName = event.currentTarget.value;

    dispatch(destroy('action'));
    fields.action_name.onChange(event);
    this.setState({
      selectedAction: { name: selectedActionName }
    });
  }

  submitForm() {
    const { dispatch, formState, recipeId } = this.props;

    let submitAction, submitOnSuccess;
    let recipeFormValues = getValues(formState.recipe);
    let actionFormValues = getValues(formState.action);
    let combinedFormValues = { ...recipeFormValues, arguments: actionFormValues };
    let requestBody = { recipe: combinedFormValues, recipeId };

    if (recipeId) {
      submitAction = 'updateRecipe';
      submitOnSuccess = (response) => dispatch(recipeUpdated(response));
    } else {
      submitAction = 'addRecipe';
      submitOnSuccess = (response) => dispatch(recipeAdded(response));
    }

    return dispatch(makeApiRequest(submitAction, requestBody)).then(response => submitOnSuccess(response));
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selectedAction && nextProps.recipe) {
      let selectedActionName = nextProps.recipe.action_name;
      this.setState({
        selectedAction: { name: selectedActionName }
      });
    }
  }

  render() {
    const { fields: { name, filter_expression, enabled, action_name },
      recipe, recipeId, handleSubmit, viewingRevision } = this.props;
    const { availableActions, selectedAction } = this.state;

    return (
      <form onSubmit={handleSubmit(::this.submitForm)} className="crud-form">

        { viewingRevision &&
          <p className="notification info">
            You are viewing a past version of this recipe. Saving this form will rollback the recipe to this revision.
          </p>
        }

        <FormField type="text" label="Name" field={name} containerClass="fluid-3" />
        <FormField type="textarea" label="Filter Expression" field={filter_expression} containerClass="fluid-3" />
        <FormField type="select" label="Action" field={action_name} containerClass="fluid-3"
          options={availableActions}
          onChange={::this.changeAction}
        />

        { selectedAction && <ActionForm recipe={recipe} {...selectedAction} /> }

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
    form: 'recipe'
  }, (state, props) => {
    let fields = ['name', 'filter_expression', 'enabled', 'action_name'];
    let selectedRecipeRevision = (props.location.state) ? props.location.state.selectedRevision : null;

    return {
      fields,
      initialValues: selectedRecipeRevision || props.recipe,
      viewingRevision: ((selectedRecipeRevision || props.location.query.revisionId) ? true : false),
      formState: state.form
    }
})(RecipeForm))
