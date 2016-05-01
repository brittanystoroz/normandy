import React from 'react'

export default class DeleteRecipe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="fluid-7">
        <form action="" method="post" className="crud-form">
          {% csrf_token %}
          <p>Are you sure you want to delete "{this.props.recipe.name}"?</p>
          <div className="form-action-buttons">
            <div className="fluid-2 float-right">
              <input type="submit" value="Confirm" class="delete" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
