import React from 'react'

import { connect } from 'react-redux'
import ControlActions from '../actions/ControlActions.js'
import ControlStore from '../stores/ControlStore.js'
import Header from './Header.jsx'

import { push } from 'react-router-redux'

class ControlApp extends React.Component {
  constructor(props) {
    super(props);
  }

  editRecipe(e, recipeId) {
    const { dispatch } = this.props;
    dispatch(ControlActions.setSelectedRecipe({
      id: recipeId
    }));
    dispatch(push(`/control/recipe/${recipeId}/`));
  }

  deleteRecipe(e, recipeId) {
    e.preventDefault();
    ControlStore.dispatch(push(`/control/recipe/${recipeId}/delete`));
  }

  confirmDelete(e, recipeId) {
    e.preventDefault();
    ControlActions.deleteRecipe({
      id: recipeId
    });
  }

  getChildProps(childType) {
    switch(childType) {
      case 'RecipeForm':
        return { deleteRecipe: this.deleteRecipe.bind(this) };
      case 'RecipeList':
        return { editRecipe: this.editRecipe.bind(this) };
      case 'DeleteRecipe':
        return { confirmDelete: this.confirmDelete.bind(this) };
      default:
        throw new Error('No components to load :(');
    }
  }

  render() {
    return (
      <div>
        <Header pageType={this.props.children.props.route} />
        <div id="content" className="wrapper">
          <div className="fluid-8">
            {React.Children.map(this.props.children,
              (child) => React.cloneElement(child, this.getChildProps(child.type.WrappedComponent.name)))}
          </div>
        </div>
      </div>
    )
  }
}

ControlApp.contextTypes = {
  router: React.PropTypes.object
}

let mapStateToProps = (state, ownProps) => {
  const { selectedRecipe, recipes } = state
  return {
    selectedRecipe,
    recipes,
    route: ownProps.route
  }
}

export default connect(mapStateToProps)(ControlApp)
