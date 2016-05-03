import React from 'react'
import { connect } from 'react-redux'
import ControlActions from '../actions/ControlAppActions.js'

class RecipeHistory extends React.Component {
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
    let recipe = this.props.recipe;
    if (recipe) {
      return (
        <div className="fluid-7">
          {recipe.name}
        </div>
      )
    } else {
      return null
    }
  }
}

let mapStateToProps = (state) => {
  return {
    recipe: state.selectedRecipe.recipe,
    isFetching: state.selectedRecipe.isFetching
  }
}

RecipeHistory.propTypes = {
  recipe: React.PropTypes.object,
}

export default connect(
  mapStateToProps
)(RecipeHistory)

