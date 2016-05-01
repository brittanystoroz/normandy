import React from 'react'

import { connect } from 'react-redux'
import ControlActions from '../actions/ControlActions.js'
import ControlStore from '../stores/ControlStore.js'
import Header from './Header.jsx'

import { push } from 'react-router-redux'

class ControlApp extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.getStateFromStores();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // ControlStore.addChangeListener(this.onChange);
    // ControlActions.fetchAllRecipes();

    // const { dispatch } = this.props;

  }

  componentWillUnmount() {
    ControlStore.removeChangeListener(this.onChange);
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
    console.log('editing recipe!');
    const { dispatch } = this.props;
    dispatch(ControlActions.setSelectedRecipe({
      id: recipeId
    }));
    dispatch(push(`/control/recipe/${recipeId}/`));
  }

  deleteRecipe(e, recipeId) {
    e.preventDefault();
    ControlActions.deleteRecipe(recipeId);
    ControlStore.dispatch(push(`/control/recipe/${recipeId}/delete`));
  }

  getChildProps(childType) {
    console.log('Child Type: ', childType);
    switch(childType) {
      case 'RecipeForm':
        return { deleteRecipe: this.deleteRecipe.bind(this) };
      case 'RecipeList':
        return { editRecipe: this.editRecipe.bind(this) };
      case 'DeleteRecipe':
        return {};
      default:
        throw new Error('No components to load :(');
    }
  }

  render() {
    return (
      <div className="fluid-8">
        <Header route={this.props.route} />
        {React.Children.map(this.props.children,
          (child) => React.cloneElement(child, this.getChildProps(child.type.WrappedComponent.name)))}
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
  console.log("Mapping with OWNPROPS: ", ownProps.route);
}

export default connect(mapStateToProps)(ControlApp)
