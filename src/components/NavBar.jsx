import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import recipeStore from '../stores/RecipeStore';
import SearchBar from './SearchBar';
import '../css/NavBar.css';
import dog from '../assets/img/ikigai-the-pastry-chef-making-a-three-tiered-cake-1.png';

const NavBar = observer(() => {

  const navigate = useNavigate();

  const handleNewRecipe = () => {
    navigate('/add-recipe');
    recipeStore.resetNewRecipe();
  };

  return (
    <div className="navbar-container">
        <div className="navbar">
            <h1 className='navbar-title'>LoveBites</h1>
            <div className="create-icon add-recipe" onClick={handleNewRecipe}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABRUlEQVR4nO2UQU7DMBBFswDWXIDaf7LrCrUqYoNyBBR5Im7AIUBdVeIGnIK20AWnQWLbDYgjgCZxRUhR47Z2JIRHmkVGjt/TeOwkiREjUGRZdmBIjw3htUo9llrSRVwPh4eG9AMTPutZALedwJn0VICG8F4AZwa4KL+hXzqF52lvIPVcqXNnAW60rS2l1XK2JRx6tgZPewP5rgRw41XA1OAGmG+E27XOAolj1OFM+MiBkdQLpU4ZeCvr0DNZ57QhbyFQtR2P3uDbCBT9/pF3uKtAMLiLgMANYdEy7XOB7/TycZsAqXwTXDqzgsvkexcwwMReq7tf4E/SoXKdfYq9CzD0sxW4F4nve47FCu6yz84ChrBcf5B+woMJXKXpiQUupRNyHDITTXgwgUuljkVi333C/NiIKMDxCGjPIWRP+fcEYvy7+AK5mGOrygb74wAAAABJRU5ErkJggg==" />
            </div>
            <SearchBar />
        </div>
        <img className='dog' src={dog} alt="dog cooking" />
    </div>
  )
});

export default NavBar
