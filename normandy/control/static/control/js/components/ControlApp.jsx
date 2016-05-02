import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Header from './Header.jsx'
import ControlActions from '../actions/ControlAppActions.js'

class ControlApp extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildProps(childType) {
    switch(childType.type.WrappedComponent.name) {
      case 'RecipeList':
        return { editRecipe: this.editRecipe.bind(this) };
      case 'RecipeForm':
        return {};
      case 'DeleteRecipe':
        return {};
      default:
        throw new Error('No components to load :(');
    }
  }

  editRecipe(e, recipeId) {
    const { dispatch } = this.props;
    dispatch(ControlActions.selectRecipe(recipeId));
    dispatch(push(`/control/recipe/${recipeId}/`));
  }

  render() {
    return (
      <div>
        <Header pageType={this.props.children.props.route} />
        <div id="content" className="wrapper">
            <div className="fluid-8">
              {React.Children.map(this.props.children,
              (child) => React.cloneElement(child, this.getChildProps(child)))}
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
