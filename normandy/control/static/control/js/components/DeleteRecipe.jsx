import React from 'react'
import { connect } from 'react-redux'

import ControlActions from '../actions/ControlActions.js'


const mapStateToProps = (state) => {
  return {
    selectedRecipe: state.selectedRecipe
  }
}


class DeleteRecipe extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('form will mount...');
    const { dispatch } = this.props
    let currentRecipe = this.props.selectedRecipe || this.props.routeParams;
    dispatch(ControlActions.fetchSingleRecipe(currentRecipe.id));
  }


  render() {
    let recipe = this.props.selectedRecipe;
    if (recipe) {
      return (
        <div className="fluid-7">
          <form action="" className="crud-form">
            <p>Are you sure you want to delete "{this.props.selectedRecipe.name}"?</p>
            <div className="form-action-buttons">
              <div className="fluid-2 float-right">
                <input type="submit" value="Confirm" class="delete" onClick={(e) => { this.props.confirmDelete(e, this.props.selectedRecipe.id)}} />
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

DeleteRecipe.propTypes = {
  selectedRecipe: React.PropTypes.object,
}


export default connect(
  mapStateToProps
)(DeleteRecipe)

