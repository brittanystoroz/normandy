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
    this.parseActionFormSchema = this.parseActionFormSchema.bind(this);
    this.getInitialActionValues = this.getInitialActionValues.bind(this);

    this.state = {
      availableActions: [],
      selectedAction: null,
      actionFormFields: null
    };
  }

  getInitialActionValues() {
    if (this.props.recipe && this.state.selectedAction && this.props.recipe.action_name == this.state.selectedAction.name) {
      console.log('getting values...');
      return this.props.recipe['arguments'];
    } else {
      console.log('returning nothing from getting values...');
      return {};
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = _.pick(this.props, 'values');
    const incomingProps = _.pick(nextProps, 'values');

    // only update if the values property has changed or state has changed

    console.log('shouldRecipeFormUpdate [true/false]: ', (!_.isEqual(currentProps, incomingProps) || !_.isEqual(this.state, nextState)));
    return (!_.isEqual(currentProps, incomingProps) || !_.isEqual(this.state, nextState));
  }

  parseActionFormSchema(actionSchema) {
    let actionFormFields = [];
    let argumentsSchemaProps = actionSchema.properties;

    Object.keys(argumentsSchemaProps).map(actionField => {
            let typeOfField = argumentsSchemaProps[actionField].type;
            let objectRef = null;
            let nestedActionProperties = null;

            console.log("Processing actionField: ", actionField, typeOfField);

            switch (typeOfField) {
              case "string":
                console.log("Processing string...");
                actionFormFields.push(`${actionField}`);
                break;
              case "array":
                console.log("Processing array...");

                objectRef = argumentsSchemaProps[actionField].items.$ref.split('/');
                objectRef.shift();

                nestedActionProperties = actionSchema[objectRef[0]][objectRef[1]];

                if (nestedActionProperties.allOf) {
                  nestedActionProperties.allOf.forEach((schema, index) => {
                    if (schema.properties) {
                      Object.keys(schema.properties).map(key => {
                        actionFormFields.push(`${actionField}[].${key}`);
                      })
                    } else if (schema.$ref) {
                      let deeperObjectRef = schema.$ref.split('/');
                      deeperObjectRef.shift();
                      let deeperNestedProperties = actionSchema[deeperObjectRef[0]][deeperObjectRef[1]];
                      if (deeperNestedProperties.type === "object") {
                        Object.keys(deeperNestedProperties.properties).map(key => {
                          actionFormFields.push(`${actionField}[].${key}`)
                        })
                      }
                    }
                  })
                }
                break;

              case undefined:
                objectRef = argumentsSchemaProps[actionField].$ref.split('/');
                objectRef.shift(); // [definitions, survey]

                // arguments_schema.definitions.survey
                nestedActionProperties = actionSchema[objectRef[0]][objectRef[1]];
                // { type: "object", properties: {...} }
                console.log('nestedActionProperties: ', nestedActionProperties);

                if (nestedActionProperties.type === "object") {
                  Object.keys(nestedActionProperties.properties).map(key => {
                    actionFormFields.push(`${actionField}.${key}`)
                  })
                }
                break;
            } // end switch
    });


    return actionFormFields;
  }

  getAvailableActions(recipeId) {
    apiFetch(`/api/v1/action/`)
      .then(availableActions => {
        let actionFormFields = [];
        let selectedAction = (this.props.recipe) ? availableActions.find(action => (action.name === this.props.recipe.action_name)) : null;
        if (selectedAction) {
          actionFormFields = this.parseActionFormSchema(selectedAction.arguments_schema);
        } // end if

        this.setState({
          availableActions,
          selectedAction,
          actionFormFields
        })

    });
  }

  changeAction(event) {
    console.log("REF: ", this);
    this.props.fields.action_name.onChange(event);
    let selectedAction = this.state.availableActions.find(action => (action.name === event.currentTarget.value));
    let actionFormFields = this.parseActionFormSchema(selectedAction.arguments_schema);
    let recipeActionData = {};

    if (this.props.recipe && this.props.recipe.action_name === selectedAction.name) {
      recipeActionData = this.props.recipe['arguments'];
    }

    this.setState({
      selectedAction,
      actionFormFields: actionFormFields
    })
  }

  submitForm() {
    console.log('Submitting Form [this.props.combinedFormState]: ', this.props.combinedFormState);
    let recipeFormValues = getValues(this.props.combinedFormState.recipe);
    let actionFormValues = getValues(this.props.combinedFormState.action);
    console.log('Submitting Form [actionFormValues]: ', actionFormValues);
    let combinedFormValues = { ...recipeFormValues, arguments: actionFormValues };
    console.log("Submitting Form [combinedFormValues]: ", combinedFormValues);
    // if (this.props.recipeId) {
    //   this.props.dispatch(ControlActions.makeApiRequest('updateRecipe', { recipe: combinedFormValues, recipeId: this.props.recipeId }));
    // } else {
    //   this.props.dispatch(ControlActions.makeApiRequest('addRecipe', combinedFormValues));
    // }
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
            <ActionForm ref={(c) => this.destroyActionForm = c} recipe={recipe} initialValues={this.getInitialActionValues()} fields={this.state.actionFormFields} selectedAction={this.state.selectedAction} /> : null
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
