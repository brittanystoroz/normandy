import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ControlActions from '../actions/ControlAppActions.js'
import { reduxForm } from 'redux-form'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    if (this.props.recipeId) {
      this.props.getRecipeData(this.props.recipeId);
    }
  }

  submitForm(values) {
    if (this.props.recipeId) {
      this.props.dispatch(ControlActions.makeApiRequest('updateRecipe', { recipe: values, recipeId: this.props.recipeId }));
    } else {
      this.props.dispatch(ControlActions.makeApiRequest('addRecipe', values));
    }
  }

  render() {
    const { fields: { name }, recipeId, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitForm)} className="crud-form">
        <div className="row">
          <div className="fluid-3">
            <label>Name</label>
            <input type="text" field={name} {...name} />
          </div>
        </div>
        <div className="row form-action-buttons">
          <div className="fluid-2">
            <Link className="button delete" to={`/control/recipe/${recipeId}/delete`}>Delete</Link>
          </div>
          <div className="fluid-2 float-right">
            <button className="button" type="submit">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state, props) => {
  let recipeData = null;
  if (state.controlApp.recipes) {
    recipeData = state.controlApp.recipes.find(recipe => {
      return recipe.id === state.controlApp.selectedRecipe;
    });
  }

  return {
    recipeId: state.controlApp.selectedRecipe || parseInt(props.routeParams.id) || null,
    initialValues: recipeData
  };
}

RecipeForm.propTypes = {
  recipeId: React.PropTypes.number,
  fields: React.PropTypes.object.isRequired,
}

export default reduxForm({
  form: 'recipe',
  fields: ['name'],
}, mapStateToProps)(RecipeForm)
