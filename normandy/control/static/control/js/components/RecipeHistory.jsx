import React from 'react'
import composeRecipeContainer from './RecipeContainer.jsx'

class RecipeHistory extends React.Component {
  render() {
    const { recipe } = this.props;
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

export default composeRecipeContainer(RecipeHistory);

