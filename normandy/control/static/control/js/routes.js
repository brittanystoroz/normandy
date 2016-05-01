import React from 'react';
import {Route} from 'react-router';
import ControlApp from './components/ControlApp.jsx';
import RecipeListContainer from './components/containers/RecipeListContainer.js';
import RecipeForm from './components/RecipeForm.jsx';

export default (
  <Route path='/' component={ControlApp}>
    <Route path='control/' component={RecipeListContainer} />
    <Route path='control/recipe/:recipeId/' component={RecipeForm} />
  </Route>
);
