/* globals React:false, ReactDOM:false */

import React from 'react'
import ReactDOM from 'react-dom'
import Link from 'react-router'

import ControlActions from '../actions/ControlActions.js'
import Dispatcher from '../Dispatcher.js';
import {actionTypes} from '../constants/ControlConstants.js';

class RecipeTableData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let recipe = this.props.recipe;

    return (
      <tr key={recipe.id} onClick={(e, recipeId) => { this.props.editRecipe(e, recipe)}}>
        <td>{recipe.name}</td>
        <td>{recipe.action.name}</td>
        <td>
          {(() => {
            switch(recipe.enabled) {
              case true: return <i className="fa fa-lg fa-check green">&nbsp;</i>;
              case false: return <i className="fa fa-lg fa-times red">&nbsp;</i>;
            }
          })()}
        </td>
        <td>{recipe.sample_rate}</td>
        <td>{recipe.release_channels}</td>
      </tr>
    )
  }
}

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    ControlActions.fetchAllRecipes();
  }

  render() {
    return (
      <div className="fluid-8">
        <table id="recipe-list">
          <thead>
            <tr>
              <td>Name</td>
              <td>Action</td>
              <td>Enabled</td>
              <td>Sample Rate</td>
              <td>Release Channels</td>
            </tr>
          </thead>
          <tbody>
            { this.props.recipes.map(recipe => {
                return (<RecipeTableData editRecipe={this.props.editRecipe} recipe={recipe} key={recipe.id} />)
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
