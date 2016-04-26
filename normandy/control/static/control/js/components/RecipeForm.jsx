import React from 'react'

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <input type="text" defaultValue={this.props.recipe.name} name="name" />
      </form>
    )
  }
}
