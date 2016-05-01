import React from 'react'
import Formsy from 'formsy-react';
import { connect } from 'react-redux'

import ControlActions from '../actions/ControlActions.js'
import controlStore from '../stores/ControlStore.js'


const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    selectedRecipe: state.selectedRecipe
  }
}

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    }
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  submit(recipe) {
    const { dispatch } = this.props
    console.log('submitting form! ', recipe);
    dispatch(ControlActions.updateRecipe(recipe));
  }

  componentWillMount() {
    console.log('form will mount...');
    const { dispatch } = this.props
    let currentRecipe = this.props.selectedRecipe || this.props.routeParams;
    dispatch(ControlActions.fetchSingleRecipe(currentRecipe.id));
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
    console.log('form will receive new props...');
  }

  render() {
    console.log('form will render...', this);
    let recipe = this.props.selectedRecipe;
    if (recipe) {
      return (
        <div className="fluid-7">
          <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <input type="text" name="name" value={recipe.name} required/>
            <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
          </Formsy.Form>
          <a onClick={(e) => { this.props.deleteRecipe(e, recipe.id)}} classNames="button delete">Delete</a>
        </div>
      )
    } else {
      return null
    }

  }
}

RecipeForm.propTypes = {
  selectedRecipe: React.PropTypes.object,
}


export default connect(
  mapStateToProps
)(RecipeForm)
