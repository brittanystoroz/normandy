import React from 'react'
import { connect } from 'react-redux'
import ControlActions from '../actions/ControlAppActions.js'
import RecipeForm from './RecipeForm.jsx'

class RecipeFormContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props
    if (!this.props.recipe) {
      dispatch(ControlActions.selectRecipe(this.props.routeParams.id));
    }
  }

  render() {
    return (
      <RecipeForm recipe={this.props.recipe} />
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

RecipeForm.propTypes = {
  recipe: React.PropTypes.object,
}

export default connect(
  mapStateToProps
)(RecipeFormContainer)
