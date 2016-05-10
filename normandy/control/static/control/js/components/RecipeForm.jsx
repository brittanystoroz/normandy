import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { reduxForm, getValues } from 'redux-form'
import apiFetch from '../utils/apiFetch.js';
import ControlActions from '../actions/ControlActions.js'
import composeRecipeContainer from './RecipeContainer.jsx'
import ActionForm from './ActionForm.jsx'
import { _ } from 'underscore'


class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.getAvailableActions = this.getAvailableActions.bind(this);
    this.changeAction = this.changeAction.bind(this);

    this.state = {
      availableActions: [],
      selectedAction: null,
      actionFormFields: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldRecipeFormUpdate [this.props]: ', this.props);
    const currentProps = _.pick(this.props, 'values');
    const incomingProps = _.pick(nextProps, 'values');

    // only update if the values property has changed or state has changed
    return (!_.isEqual(currentProps, incomingProps) || !_.isEqual(this.state, nextState));
  }

  getAvailableActions(recipeId) {
    apiFetch(`/api/v1/action/`)
      .then(availableActions => {
        let selectedAction = (this.props.recipe) ? availableActions.find(action => (action.name === this.props.recipe.action_name)) : null;
        let actionFormFields = null;
        if (selectedAction) {
          actionFormFields = Object.keys(selectedAction.arguments_schema.properties).map(actionField => {
            return `arguments.${actionField}`
          })
        }

        this.setState({
          availableActions,
          selectedAction,
          actionFormFields
        })
      });
  }

  changeAction(event) {
    this.props.fields.action_name.onChange(event);
    let selectedAction = this.state.availableActions.find(action => (action.name === event.currentTarget.value));
    let actionFormFields = Object.keys(selectedAction.arguments_schema.properties).map(actionField => {
      return `arguments.${actionField}`
    });

    this.setState({
      selectedAction,
      actionFormFields
    })
  }

  submitForm() {
    console.log('Submitting Form [this.props.combinedFormState]: ', this.props.combinedFormState);
    let recipeFormValues = getValues(this.props.combinedFormState.recipe);
    let actionFormValues = getValues(this.props.combinedFormState.action);
    let combinedFormValues = { ...recipeFormValues, ...actionFormValues };
    console.log("Submitting Form [combinedFormValues]: ", combinedFormValues);
    if (this.props.recipeId) {
      this.props.dispatch(ControlActions.makeApiRequest('updateRecipe', { recipe: combinedFormValues, recipeId: this.props.recipeId }));
    } else {
      this.props.dispatch(ControlActions.makeApiRequest('addRecipe', combinedFormValues));
    }
  }

  componentDidMount() {
    this.getAvailableActions();
  }

  render() {
    console.log('Rendering Recipe Form [this.state]: ', this.state);
    console.log('Rendering Recipe Form [this.props.initialValues]: ', this.props.initialValues);
    const { fields: { name, filter_expression, action_name }, recipe, recipeId, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitForm)} className="crud-form">
        <div className="row">
          <div className="fluid-3">
            <label>Name</label>
            <input type="text" field={name} {...name} />
          </div>
        </div>
        <div className="row">
          <div className="fluid-3">
            <label>Filter Expression</label>
            <textarea field={filter_expression} {...filter_expression} />
          </div>
        </div>
        <div className="row">
          <div className="fluid-3">
            <label>Action</label>
            <select {...action_name} onChange={this.changeAction}>
              <option>Select an action</option>
              {
                this.state.availableActions.map(action => {
                  return (<option key={action.name} value={action.name}>{action.name}</option>)
                })
              }
            </select>
          </div>
          { this.state.selectedAction ?
            <ActionForm recipe={recipe} fields={this.state.actionFormFields} selectedAction={this.state.selectedAction} /> : null
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
    form: 'recipe',
  }, (state, props) => {
    console.log("Composing Recipe Form [state]: ", state);
    let fields = ['name', 'filter_expression', 'action_name'];

    return {
      fields,
      initialValues: (props.recipe ? _.pick(props.recipe, fields) : null),
      combinedFormState: state.form
    }
}
)(RecipeForm))
