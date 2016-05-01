import { connect } from 'react-redux'
import { setSelectedRecipe } from '../../actions/ControlActions.js'
import RecipeList from '../RecipeList.jsx'

const getVisibleRecipes = (recipes, filter) => {
  return recipes;
}

const mapStateToProps = (state) => {
  console.log("Mapping state to props: ", state.recipes);
  return {
    recipes: getVisibleRecipes(state.recipes)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRecipeClick: (id) => {
      dispatch(setSelectedRecipe(recipeId))
    }
  }
}

const RecipeListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList)

export default RecipeListContainer
