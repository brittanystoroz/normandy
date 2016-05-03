import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ControlActions from '../actions/ControlAppActions.js'
import RecipeForm from './RecipeForm.jsx'

class RecipeFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    if (this.props.recipe) {
      let recipeId = { id: this.props.recipe.id };
      this.props.dispatch(ControlActions.updateRecipe(Object.assign(values, recipeId)));
    } else {
      this.props.dispatch(ControlActions.addRecipe(values));
    }
    this.props.dispatch(push(`/control/`));
  }

  componentWillMount() {
    const { dispatch } = this.props
    if (!this.props.recipe) {
      dispatch(ControlActions.selectRecipe(this.props.routeParams.id));
    }
  }

  render() {
    return (
      <div className="fluid-7">
        <RecipeForm submitHandler={this.handleSubmit} />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    recipe: state.selectedRecipe.recipe,
    isFetching: state.selectedRecipe.isFetching,
    isDirty: state.selectedRecipe.isDirty
  }
}

RecipeFormContainer.propTypes = {
  submitHandler: React.PropTypes.func,
}

export default connect(
  mapStateToProps
)(RecipeFormContainer)
