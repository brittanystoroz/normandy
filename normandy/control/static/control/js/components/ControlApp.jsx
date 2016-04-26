import React from 'react'
import ControlActions from '../actions/ControlActions.js'
import ControlStore from '../stores/ControlStore.js'
import RecipeList from './RecipeList.jsx'

export default class ControlApp extends React.Component {
  constructor() {
    super();
    this.state = this.getStateFromStores();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ControlStore.addChangeListener(this.onChange);
    ControlActions.fetchAllRecipes();
  }

  componentWillUnmount() {
    ControlStore.removeChangeListener(this.onChage);
  }

  getStateFromStores() {
    return {
      'recipes': ControlStore.getRecipes(),
    }
  }

  onChange() {
    this.setState(this.getStateFromStores());
  }

  render() {
    return (
      <div className="fluid-8">
        <RecipeList recipes={this.state.recipes} />
      </div>
    )
  }
}
