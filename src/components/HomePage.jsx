import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import categoryStore from '../stores/CategoryStore';
import '../css/HomePage.css';
import logo from '../assets/img/logo.png';

const HomePage = observer(() => {

  useEffect(() => {
      categoryStore.fetchCategories();
  }, []);

  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  }

  return (
    <div className='home'>
        <img src={logo} className='logo' alt="logo" />
        <div className="title-container">
        <h1 className='title'>Find your next favorite recipe</h1>
        <h2 className='subtitle'>What kind of recipe do you want to see?</h2>
        </div>
        {categoryStore.error && <p>{categoryStore.error}</p>}
        {!categoryStore.error && (
            <div className='categories-container'>
            {categoryStore.categories.map((category) => (
                <button key={category.idCategory} onClick={() => handleCategoryClick(category.strCategory)}>{category.strCategory}</button>
            ))}
            </div>
      )}
    </div>
  );
});

export default HomePage
