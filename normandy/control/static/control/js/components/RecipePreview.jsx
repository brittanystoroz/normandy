import React from 'react'
import classNames from 'classnames'
import composeRecipeContainer from './RecipeContainer.jsx'
import {runRecipe} from '../../../../../selfrepair/static/js/self_repair_runner.js';

class RecipePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeExecuted: false,
      errorRunningRecipe: null,
      // actionDetails: {}
    };

    // this.getActionDetails = this.getActionDetails.bind(this);
  }

  // getActionDetails(actionName) {
  //   apiFetch(`/api/v1/action/${actionName}/`)
  //     .then(response => {
  //       this.setState({
  //         actionDetails: response
  //       })
  //     });
  // }

  componentDidMount() {
    const { recipe } = this.props;

    // if (this.props.recipe) {
    // console.log('recipe: ', recipe);
    // this.getActionDetails(recipe.action_name);
    // }
  }


  componentWillMount() {
    this.attemptPreview();
  }

  componentDidUpdate() {
    this.attemptPreview();
  }

  attemptPreview() {
    const {recipe} = this.props;
    const {recipeExecuted} = this.state;

    if (recipe && !recipeExecuted) {
      runRecipe(recipe, {testing: true}).then(res => {
        this.setState({recipeExecuted: true});
      }).catch(err => {
        this.setState({errorRunningRecipe: err });
        console.error(err);
      });

    }
  }

  render() {
    const {recipe} = this.props;
    let executionStatusClass = classNames({
      'btn': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });
    if (recipe) {
      return (
        <div className="fluid-6">
          <div className="fluid-3">
            <h3>Previewing {recipe.name}...</h3>
            <p><b>Action Type:</b> {recipe.action_name}</p>
          </div>
          <div className="fluid-2 float-right">
            <div className={this.state.recipeExecuted ? 'green' : ''} >
            {this.state.recipeExecuted ?
              [<i className='fa fa-circle'></i>, " Recipe executed!"] :
              [<i className='fa fa-circle-thin'></i>, " Running recipe..."]
            }
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default composeRecipeContainer(RecipePreview);
