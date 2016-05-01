import React from 'react'

import { connect } from 'react-redux'
import ControlActions from '../actions/ControlActions.js'
import ControlStore from '../stores/ControlStore.js'
import RecipeListContainer from './containers/RecipeListContainer.js'

class ControlApp extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.getStateFromStores();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // ControlStore.addChangeListener(this.onChange);
    // ControlActions.fetchAllRecipes();
    const { dispatch } = this.props
    dispatch(ControlActions.fetchAllRecipes());

  }

  componentWillUnmount() {
    ControlStore.removeChangeListener(this.onChage);
  }

  getStateFromStores() {
    // return {
    //   'selectedRecipe': ControlStore.getSelectedRecipe(),
    //   'recipes': ControlStore.getRecipes(),
    // }
  }

  onChange() {
    // this.setState(this.getStateFromStores());
  }

  editRecipe(e, recipeId) {
    // ControlActions.fetchSingleRecipe(recipeId);
    // this.context.router.push(`/control/recipe/${recipeId}/`);
  }

  deleteRecipe(e, recipeId) {
    e.preventDefault();
    ControlActions.deleteRecipe(recipeId);
  }

  getChildProps(childType) {
    console.log('Child Type: ', childType);
    switch(childType) {
      case 'RecipeForm':
        return { recipe: this.state.selectedRecipe, deleteRecipe: this.deleteRecipe.bind(this) };
      case 'RecipeList':
        return { recipes: this.state.recipes, editRecipe: this.editRecipe.bind(this) };
      case 'DeleteRecipe':
        return { recipe: this.state.selectedRecipe };
      default:
        throw new Error('No components to load :(');
    }
  }

  render() {
    return (
      <div className="fluid-8">
        <RecipeListContainer />
      </div>
    )
  }
}

ControlApp.contextTypes = {
  router: React.PropTypes.object
}

let mapStateToProps = (state) => {
  const { selectedRecipe, recipes } = state
  return {
    selectedRecipe,
    recipes
  }
}

export default connect(mapStateToProps)(ControlApp)
