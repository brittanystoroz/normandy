import React from 'react';
import {Route} from 'react-router';
import ControlApp from './components/ControlApp.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeForm from './components/RecipeForm.jsx';

export default (
  <Route path='/' component={ControlApp}>
    <Route path='control/' component={RecipeList} />
    <Route path='control/recipe/:recipeId/' component={RecipeForm} />
  </Route>
);
