import React from 'react';
import {Route} from 'react-router';
import ControlApp from './components/ControlApp';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';

export default (
  <Route component={ControlApp}>
    <Route path='control' component={RecipeList} />
    <Route path='recipe/:recipeId/' component={RecipeForm} />
  </Route>
);
