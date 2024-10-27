import { observer } from 'mobx-react-lite';
import recipeStore from '../stores/RecipeStore';
import Recipe from './Recipe';

const Recipes = observer(({ categoryName }) => {
  return (
    <div className="recipes">
      {recipeStore.paginatedRecipes.map((recipe) => (
        <Recipe key={recipe.idMeal} recipeId={recipe.idMeal} categoryName={categoryName} />
      ))}
    </div>
  );
});

export default Recipes;
