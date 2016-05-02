import React from 'react'
import { connect } from 'react-redux'
import ControlActions from '../actions/ControlAppActions.js'

class DeleteRecipe extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props
    if (!this.props.recipe) {
      dispatch(ControlActions.selectRecipe(this.props.routeParams.id));
    }
  }

  render() {
    let recipe = this.props.recipe;
    if (recipe) {
      return (
        <div className="fluid-7">
          <form action="" className="crud-form">
            <p>Are you sure you want to delete "{recipe.name}"?</p>
            <div className="form-action-buttons">
              <div className="fluid-2 float-right">
                <input type="submit" value="Confirm" class="delete" onClick={(e) => { this.props.deleteRecipe(e, this.props.recipe.id)}} />
              </div>
            </div>
          </form>
        </div>
      )
    } else {
      return null
    }
  }
}

let mapStateToProps = (state) => {
  return {
    recipe: state.selectedRecipe.recipe,
    isFetching: state.selectedRecipe.isFetching
  }
}

DeleteRecipe.propTypes = {
  recipe: React.PropTypes.object,
}

export default connect(
  mapStateToProps
)(DeleteRecipe)

