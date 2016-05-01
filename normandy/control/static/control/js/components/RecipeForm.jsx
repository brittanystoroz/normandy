import React from 'react'
import { connect } from 'react-redux'

import ControlActions from '../actions/ControlActions.js'


const mapStateToProps = (state) => {
  console.log("Mapping state to props: ", state.selectedRecipe);
  return {
    selectedRecipe: state.selectedRecipe
  }
}

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('component mounted!', this.props.selectedRecipe.id);
    const { dispatch } = this.props
    dispatch(ControlActions.fetchSingleRecipe(this.props.selectedRecipe.id));
  }

  componentWillReceiveProps() {
    console.log("receiving props!", this);
  }

  render() {
    let recipe = this.props.selectedRecipe;
    return (
      <div className="fluid-7">
        {recipe.id}
        {recipe.name}
        <a onClick={(e) => { this.props.deleteRecipe(e, recipe.id)}} classNames="button delete">Delete</a>
      </div>
    )
  }
}

RecipeForm.propTypes = {
  selectedRecipe: React.PropTypes.object,
}


export default connect(
  mapStateToProps
)(RecipeForm)
