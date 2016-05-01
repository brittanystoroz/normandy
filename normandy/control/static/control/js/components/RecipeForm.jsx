import React from 'react'

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let recipe = this.props.recipe;
    return (
      <div className="fluid-7">
        <form>
          <input type="text" defaultValue={recipe.name} name="name" />
        </form>
        <a onClick={(e) => { this.props.deleteRecipe(e, recipe.id)}} classNames="button delete">Delete</a>
      </div>
    )
  }
}
