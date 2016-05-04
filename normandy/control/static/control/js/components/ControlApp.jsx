import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Header from './Header.jsx'
import ControlActions from '../actions/ControlAppActions.js'

class ControlApp extends React.Component {
  constructor(props) {
    super(props);
    this.getRecipeData = this.getRecipeData.bind(this);
  }

  getRecipeData(recipeId) {
    const { dispatch } = this.props;
    if (!this.props.recipes) {
      dispatch(ControlActions.setSelectedRecipe(recipeId));
      dispatch(ControlActions.fetchSingleRecipe(recipeId));
    }
  }

  render() {
    return (
      <div>
        <Header pageType={this.props.children.props.route} currentLocation={this.props.location.pathname} />
        <div id="content" className="wrapper">
            <div className="fluid-8">
              {React.Children.map(this.props.children,
              (child) => React.cloneElement(child, { getRecipeData: this.getRecipeData }))}
            </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  const { recipes } = state.controlApp
  return {
    recipes
  }
}

export default connect(mapStateToProps)(ControlApp)
