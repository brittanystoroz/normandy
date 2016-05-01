import React from 'react';
import {Route} from 'react-router';
import ControlApp from './components/ControlApp.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeForm from './components/RecipeForm.jsx';
import DeleteRecipe from './components/DeleteRecipe.jsx';

export default (
  <Route path='/' component={ControlApp}>
    <Route path='control/' component={RecipeList} pageTitle="Recipes" />
    <Route path='control/recipe/:recipeId/' component={RecipeForm} pageTitle="Edit Recipe: " />
    <Route path='control/recipe/:recipeId/delete' component={DeleteRecipe} pageTitle="DeleteRecipe: " />
  </Route>
);
