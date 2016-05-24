import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { destroy, reduxForm, getValues } from 'redux-form'
import { _ } from 'underscore'

import { parseJsonSchema, generateFieldsFromSchema } from '../utils/formSchemaHelpers.js';
import { makeApiRequest, updateRecipe, recipeUpdated, addRecipe, recipeAdded } from '../actions/ControlActions.js'
import composeRecipeContainer from './RecipeContainer.jsx'
import ActionForm from './ActionForm.jsx'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.getAvailableActions = this.getAvailableActions.bind(this);
    this.changeAction = this.changeAction.bind(this);

    this.state = {
      availableActions: [],
      selectedAction: null,
    };
  }

  getAvailableActions(recipeId) {
    fetch('/api/v1/action/')
    .then(response => response.json())
    .then(availableActions => {
      let selectedActionName = (this.props.recipe ? this.props.recipe.action_name : null);

      availableActions.map(action => {
        parseJsonSchema(action.arguments_schema)
        .then(schema => {
          action.arguments_schema = schema;
          action.fields = generateFieldsFromSchema(schema);

          if (selectedActionName === action.name) {
            this.setState({
              selectedAction: action
            });
          }
          return action;
        })
      });

      this.setState({
        availableActions
      });
    });
  }

  changeAction(event) {
    const { dispatch, fields } = this.props;
    let selectedActionName = event.currentTarget.value;

    dispatch(destroy('action'));
    fields.action_name.onChange(event);
    this.setState({
      selectedAction: this.state.availableActions.find(action => action.name === selectedActionName)
    });
  }

  submitForm() {
    const { dispatch, formState, recipeId, fields } = this.props;
    let recipeFormValues = getValues(formState.recipe);
    let actionFormValues = getValues(formState.action);
    let combinedFormValues = { ...recipeFormValues, arguments: actionFormValues };

    let action = recipeId ? 'updateRecipe' : 'addRecipe';
    let sideEffect = recipeId ? 'recipeUpdated' : 'recipeAdded';
    let requestBody = {
      recipe: combinedFormValues,
      recipeId
    }

    return new Promise((resolve, reject) => {
      dispatch(makeApiRequest(action, requestBody)).then(response => {
        dispatch(sideEffect(response));
        resolve();
      }).catch(response => {
        let formFieldErrors = { _error: 'Submit failed' };
        Object.keys(response).forEach(fieldName => {
          formFieldErrors[fieldName] = response[fieldName].join(', ');
        });
        reject(formFieldErrors);
      });
    });

  }

  componentDidMount() {
    this.getAvailableActions();
  }

  render() {
    const { fields: { name, filter_expression, enabled, action_name }, recipe, recipeId, handleSubmit, viewingRevision } = this.props;
    const { availableActions, selectedAction } = this.state;
    return (
      <form onSubmit={handleSubmit(this.submitForm)} className="crud-form">
        { viewingRevision ?
          <p className="notification info">
            You are viewing a past version of this recipe. Saving this form will rollback the recipe to this revision.
          </p> : ''
        }
        <div className="row">
          <div className="fluid-3">
            <label>Name <span className="validation-errors">{name.error}</span></label>
            <input type="text" field={name} {...name} />
          </div>
        </div>
        <div className="row">
          <div className="fluid-3">
            <label>Filter Expression <span className="validation-errors">{filter_expression.error}</span></label>
            <textarea field={filter_expression} {...filter_expression} />
          </div>
        </div>
        <div className="row">
          <div className="fluid-3">
            <label>Action <span className="validation-errors">{action_name.error}</span></label>
            <select {...action_name} onChange={this.changeAction}>
              <option>Select an action</option>
              {
                availableActions.map(action => {
                  return (<option key={action.name} value={action.name}>{action.name}</option>)
                })
              }
            </select>
          </div>
          { selectedAction ?
            <ActionForm recipe={recipe} {...selectedAction} /> : null
          }
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
