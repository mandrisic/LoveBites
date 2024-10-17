import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import recipeStore from '../stores/RecipeStore';
import '../css/Recipe.css';

const Recipe = observer(({ recipeId }) => {
  const navigate = useNavigate();
  const recipe = recipeStore.recipes.find((r) => r.idMeal === recipeId);

  const handleClick = () => {
    if (recipe) {
      navigate(`/recipe/${recipe.idMeal}`);
    }
  };

  return (
    <div onClick={handleClick} className="recipe">
      <img className='recipe-img' src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
    </div>
  );
}
);

export default Recipe;