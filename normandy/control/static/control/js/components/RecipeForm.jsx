import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import apiFetch from '../utils/apiFetch.js';
import ControlActions from '../actions/ControlActions.js'
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
      selectedAction: null
    };
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

  changeAction(event) {
    this.props.fields.action_name.onChange(event);
    this.setState({
      selectedAction: this.state.availableActions.find(action => (action.name === event.currentTarget.value))
    })
  }

  submitForm(values) {
    if (this.props.recipeId) {
      this.props.dispatch(ControlActions.makeApiRequest('updateRecipe', { recipe: values, recipeId: this.props.recipeId }));
    } else {
      this.props.dispatch(ControlActions.makeApiRequest('addRecipe', values));
    }
  }

  componentDidMount() {
    this.getAvailableActions();
  }

  render() {
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
              {
                this.state.availableActions.map(action => {
                  return (<option key={action.name} value={action.name}>{action.name}</option>)
                })
              }
            </select>
          </div>
          { this.state.selectedAction ? <ActionForm recipe={this.props.recipe} selectedAction={this.state.selectedAction} /> : null }
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
    fields: ['name', 'filter_expression', 'action_name']
  }, (state, props) => ({ // mapStateToProps
    initialValues: (props.recipe || null)
  })
)(RecipeForm))
