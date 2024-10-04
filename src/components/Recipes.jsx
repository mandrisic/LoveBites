import React from 'react';
import Recipe from './Recipe';

const Recipes = ({ recipes }) => {
  return (
    <div className="recipes">
      {recipes.map((recipe) => (
        <Recipe key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
};

export default Recipes;