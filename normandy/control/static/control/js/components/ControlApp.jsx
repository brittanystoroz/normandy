import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Header from './Header.jsx'
import ControlActions from '../actions/ControlAppActions.js'

class ControlApp extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteRecipe(e, recipeId) {
    const { dispatch } = this.props;
    dispatch(ControlActions.deleteRecipe(recipeId));
    dispatch(push(`/control/`));
  }

  getChildProps(childType) {
    let componentName = (childType.name === 'Connect') ? childType.WrappedComponent.name : childType.name;
    switch(componentName) {
      case 'RecipeList':
        return { editRecipe: this.editRecipe.bind(this) };
      case 'RecipeFormContainer':
        return {};
      case 'RecipeHistory':
        return {};
      case 'DeleteRecipe':
        return { deleteRecipe: this.deleteRecipe.bind(this) };
      default:
        throw new Error('No components to load :(');
    }
  }

  editRecipe(e, recipeId) {
    const { dispatch } = this.props;
    dispatch(push(`/control/recipe/${recipeId}/`));
  }

  render() {
    return (
      <div>
        <Header pageType={this.props.children.props.route} currentLocation={this.props.location.pathname} />
        <div id="content" className="wrapper">
            <div className="fluid-8">
              {React.Children.map(this.props.children,
              (child) => React.cloneElement(child, this.getChildProps(child.type)))}
            </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  const { selectedRecipe, recipeCollection } = state
  return {
    selectedRecipe,
    recipeCollection
  }
}

export default connect(mapStateToProps)(ControlApp)
