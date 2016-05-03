import React from 'react'; // eslint-disable-line no-unused-vars
import { Route } from 'react-router';
import ControlApp from './components/ControlApp.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeFormContainer from './components/RecipeFormContainer.jsx';
import DeleteRecipe from './components/DeleteRecipe.jsx';
import RecipeHistory from './components/RecipeHistory.jsx';

export default (
  <Route component={ControlApp}>
    <Route path='control/'
      component={RecipeList}
      pageTitle="Recipes"
      ctaButton={{text: 'Add New', icon: 'plus', link: 'recipe/new/'}}
    />
    <Route path='control/recipe/new/'
      component={RecipeFormContainer}
      pageTitle="Add New Recipe"
    />
    <Route path='control/recipe/:id/'
      component={RecipeFormContainer}
      pageTitle="Edit Recipe: "
      ctaButton={{text: 'History', icon: 'history', link: 'history/'}}
    />
    />
    <Route path='control/recipe/:id/history/'
      component={RecipeHistory}
      pageTitle="Recipe History: "
    />
    <Route
      path='control/recipe/:id/delete'
      component={DeleteRecipe}
      pageTitle="DeleteRecipe: "
    />
  </Route>
);
