import React from 'react'
import { connect } from 'react-redux'

import ControlActions from '../actions/ControlActions.js'


const mapStateToProps = (state) => {
  console.log("Mapping state to props: ", state.selectedRecipe);
  return {
    selectedRecipe: state.selectedRecipe
  }
}


class DeleteRecipe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="fluid-7">
        <form action="" method="post" className="crud-form">
          <p>Are you sure you want to delete "{this.props.selectedRecipe.name}"?</p>
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

DeleteRecipe.propTypes = {
  selectedRecipe: React.PropTypes.object,
}


export default connect(
  mapStateToProps
)(DeleteRecipe)

