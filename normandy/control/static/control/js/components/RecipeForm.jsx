/* globals React:false, ReactDOM:false */

import React from 'react'

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <form>
        <input type="text" value="{this.props.recipe.name}" name="name" />
      </form>
    )
  }
}
