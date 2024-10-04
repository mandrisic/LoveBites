import React from 'react';
import '../css/Recipe.css';

const Recipe = ({ recipe }) => {
  return (
    <div className="recipe">
      <img className='recipe-img' src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
    </div>
  );
};

export default Recipe;
