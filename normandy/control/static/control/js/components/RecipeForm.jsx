import React from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import apiFetch from '../utils/apiFetch.js';
import ActionForm from './ActionForm.jsx'
import ControlActions from '../actions/ControlActions.js'
import composeRecipeContainer from './RecipeContainer.jsx'
import { _ } from 'underscore'



class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.getAvailableActions = this.getAvailableActions.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeAction = this.changeAction.bind(this);
    this.createActionFieldName = this.createActionFieldName.bind(this);

    this.state = {
      availableActions: [],
      selectedAction: null,
      formValues: {
        recipeValues: {},
        actionValues: {}
      },
      initialValues: {
        recipeValues: {},
        actionValues: {}
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps: ', nextProps);
    let actionValues = nextProps.recipe['arguments'];
    let recipeValues = _.pick(nextProps.recipe, 'name', 'enabled', 'filter_expression', 'action_name')

    this.setState({
      formValues: {
        recipeValues,
        actionValues,
      },
      initialValues: {
        recipeValues,
        actionValues,
      }
    })
  }

  componentDidReceiveProps() {
    console.log('componentDidReceiveProps');
  }

  getAvailableActions(recipeId) {
    apiFetch(`/api/v1/action/`)
      .then(response => {
        this.setState({
          availableActions: response,
          selectedAction: (this.props.recipe) ? response.find(action => (action.name === this.props.recipe.action_name)) : null
        })
      });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('props equal: ', _.isEqual(this.props, nextProps));
  //   console.log('formVals equal: ', _.isEqual(this.state.formValues.recipeValues, nextState.formValues.recipeValues))
  //   if (
  //     _.isEqual(this.props, nextProps) &&
  //     _.isEqual(this.state.formValues.recipeValues, nextState.formValues.recipeValues) &&
  //     !_.isEqual(this.state.selectedAction, nextState.selectedAction)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  handleInputChange(event) {

    console.log('input changing: ', event.target);
    let fieldType = event.target.getAttribute('data-model');
    console.log('fieldType: ', fieldType);
    let fieldName = event.target.getAttribute('name');
    let fieldValue = event.currentTarget.value;
    console.log('fieldType: ', fieldType);

    // let updatedFormValueObject = {}
    // let fieldNames = fieldName.split('.').reverse();
    // // [surveyId, arguments]

    // fieldNames.map((property, index) => {
    //   console.log('property: ', property);
    //   console.log('index: ', index);
    //   console.log('previous prop: ', fieldNames[index - 1]);
    //   let previousProp = fieldNames[index - 1];

    //   if (previousProp) {
    //     updatedFormValueObject = {
    //       [property]: { [previousProp]: updatedFormValueObject[previousProp] }
    //     }
    //   } else {
    //     updatedFormValueObject[property] = fieldValue
    //   }
    //   // { surveyId: hello-there-new-survey }
    //   // if (updateFormValueObject[fieldName[index + 1]])
    // })
    // console.log('field name: ', fieldName);
    // console.log('updatedFormValueObject: ', updatedFormValueObject);

    let newFormValue = {
      recipeValues: {
        ...this.state.formValues.recipeValues,
        [fieldName]: event.currentTarget.value
      }
    };

    if (fieldType === "action") {
      fieldName = fieldName.split('-')[1];
      newFormValue = {
        actionValues: {
          ...this.state.formValues.actionValues,
          [fieldName]: event.currentTarget.value
        }
      }
    }
    console.log('new form value: ', newFormValue);
    this.setState({
      formValues: {
        ...this.state.formValues,
        ...newFormValue
      }
    });
  }

  resetActionFields(actionProps) {
    let argsObject = {};
    Object.keys(actionProps).map(actionProp => {
      argsObject[actionProp] = (this.props.recipe ? (this.props.recipe['arguments'][actionProp] || '') : '')
    })
    console.log('argsObject: ', argsObject);
    return argsObject;
  }

  changeAction(event) {
    let selectedAction = this.state.availableActions.find(action => (action.name === event.currentTarget.value));
    console.log('arguments schema: ', selectedAction.arguments_schema.properties);
    this.setState({
      selectedAction,
      formValues: {
        ...this.state.formValues,
        recipeValues: {
          ...this.state.formValues.recipeValues,
          action_name: event.currentTarget.value,
        },
        actionValues: {}
      }
    })
  }

  createActionFieldName(fieldName) {
    return `arguments.${fieldName}`;
  }

  submitForm(e) {
    e.preventDefault();
    console.log('values: ', e);
    let recipeValues = {
      ...this.state.formValues.recipeValues,
      arguments: this.state.formValues.actionValues
    }

    console.log('recipeValues: ', recipeValues);
    if (this.props.recipeId) {
      this.props.dispatch(ControlActions.makeApiRequest('updateRecipe', { recipe: recipeValues, recipeId: this.props.recipeId }));
    } else {
      this.props.dispatch(ControlActions.makeApiRequest('addRecipe', recipeValues));
    }
  }

  componentDidMount() {
    this.getAvailableActions();
  }

  render() {
    const { recipe, recipeId, handleSubmit } = this.props;
    const { formValues } = this.state;
    console.log('rendering form: ', this.state, this.props);
    return (
      <form onSubmit={this.submitForm} className="crud-form">
        <div className="row">
          <div className="fluid-3">
            <label>Name</label>
            <input type="text" data-model="recipe" name="name" value={formValues.recipeValues.name || ''} onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="fluid-3">
            <label>Filter Expression</label>
            <textarea data-model="recipe" name="filter_expression" value={formValues.recipeValues.filter_expression || ''} onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="fluid-3">
            <label>Action</label>
            <select data-model="recipe" onChange={this.changeAction} value={formValues.recipeValues.action_name}>
              <option>Select an Action</option>
              {
                this.state.availableActions.map(action => {
                  return (<option key={action.name} value={action.name}>{action.name}</option>)
                })
              }
            </select>
          </div>
          {
            this.state.selectedAction ?
            <ActionForm recipe={recipe} handleInputChange={this.handleInputChange} initialValues={this.state.initialValues.actionValues} selectedAction={this.state.selectedAction} /> : ''
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
  recipe: React.PropTypes.object,
}

export default composeRecipeContainer(RecipeForm)
