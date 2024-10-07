import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Recipe.css';

const Recipe = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div onClick={handleClick} className="recipe">
      <img className='recipe-img' src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
    </div>
  );
};

export default Recipe;