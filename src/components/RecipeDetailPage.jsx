import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import recipeStore from '../stores/RecipeStore';
import menuStore from '../stores/MenuStore';
import '../css/RecipeDetailPage.css';

const RecipeDetailPage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    recipeStore.fetchRecipeDetail(id);
    window.scrollTo(0, 0);
  }, [id]);

  const { recipeDetail } = recipeStore;
  if (!recipeDetail) return <p>Loading...</p>;

  const ingredientsList = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeDetail[`strIngredient${i}`];
    const measure = recipeDetail[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredientsList.push({
        ingredient,
        measure,
        img: `https://www.themealdb.com/images/ingredients/${ingredient}.png`
      });
    }
  }

  const hasSteps = recipeDetail.strInstructions.includes('STEP');
  const instructions = recipeDetail.strInstructions
    ? recipeDetail.strInstructions.split(/(STEP \d+)/g).filter(step => step.trim() !== '')
    : [];

  const toggleMenu = () => {
    menuStore.toggleOptionsContainer();
  };

  return (
    <div className="details-container">
      <div className="details-picture">
          <div className='back details-back' onClick={() => navigate(-1)}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABI0lEQVR4nO2WS0oDQRCGe69LzQQhdP2VkEUuET3CpLohgjfQrbhWD6R4D9GF+LiFr60mVGeCLu0Z6UbpD2Y59f/1nDGmUPhPCHDore1nEffAkWMsHOMhi4mauedAd2pCmJ7mg8FOMSGlEvjrM1Ez9wQ4F8aNMN6bNWv9CONeY/5I3APOgV67irYy4FWc8RleBC480fSgqjaiyqdxrO3rYYo6UPWqbyFzz3QcK9pJXNGerzM3qcUVx7gN2RNNTWpxRUBvwcBksmkimQPV19rhsdXuu3X/Iw38iriiOx+CDO2uyfE5dsBZM4SXWX5I/Gi0LaCX5nyemBwI80wYH6uS0tVsaPfaDGUnPNtamJ6/n1KTmv3xeEuAUwdc63omN1AomAQsARYcz0MpeHV4AAAAAElFTkSuQmCC" />
          </div>
          <div className="back detail-options" onClick={toggleMenu}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABzklEQVR4nO3UXU/aUBzHcV6ITZSnAl2rtxYqz8WrkQKlT7Sg2e2iYSjZWOKFiRuOidt8E5DGvjFp7HkD/91u8RyCmt0s/8/9Lznf9PTEYgghhBBCCCGEEKIyEgnOTKd9O5MmvVyWeIIQHIsiH1tjqCjc8KDgfygVyahSJuNaNfjcaKzdzIwmN9U7/sw0yI1lkrlt3c8dZ+1mo8MbycTK4tPgZHhwc1novxFgIInhQBA41uFPCvnV8ECBUakIZ5UyjGtV+FivhRNVpW4um03ua7u1uu7qMDMNuLEtuHVs+NnrrX44ztaLAzqJuG+kkkAJgKM9aUnbvM/v+6eFPDwJUOswUVXq5krT/GmnDU8C3B7ceR51sxE9vkNYAce7UsQIIKyAT2qdurlqaYQZ0PeifxJwtCs9Pjdg0lAfnxvwy3Opm4104jsB8wvsSQtqgCwH7CtUp26+aFrAvkKu/+IAfXub76aSISXg4Z0oUn+uE1nmTwtySAl4uDg8pG6m+lt+2m6FtJ/4djBIxV79jPKppZ3hIzeXjfpCbsE6/F/PqKIsR8VidFYuReNqZXHOOPyfz+i1ri+/Gd3ou2VGc9tevOoFQgghhBBCCCGE/nO/AbzrQLTLzcbVAAAAAElFTkSuQmCC" />
          </div>
          <img className='details-img' src={recipeDetail.strMealThumb} alt={recipeDetail.strMeal} />
      </div>
      <div className="details">
        <h2>{recipeDetail.strMeal}</h2>
        <div className="key-words">
          <div className="key-word">
              {recipeDetail.strCategory}
          </div>
          <div className="key-word">
              {recipeDetail.strArea}
          </div>
        </div>
        <h3>Ingredients:</h3>
        <div className="ingredients-container">
          <div className='ingredients-list'>
          {ingredientsList.map((item, index) => (
            <div key={index} className="ingredient-item">
              <img src={item.img} className='ingredient-img' alt={item.ingredient} />
              <span>{item.measure}</span>
              <span className='bolder-span'>{item.ingredient}</span>
          </div>
          ))}
          </div>
        </div>
        <h3>Instructions:</h3>
          {hasSteps ? (
            <ul className='instructions-list'>
              {instructions.map((step, index) => {
                if (step.includes('STEP')) {
                  const nextStep = instructions[index + 1] || '';
                  return (
                    <li className='list-line' key={index}>
                      <strong>{step}:</strong> {nextStep.trim()} {/* Spajamo STEP i tekst */}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            ) : (
            <ul className='instructions-list'>
              <li className='list-line'>{recipeDetail.strInstructions}</li>
            </ul>
            )}
      </div>

      <div className={`menu-overlay ${menuStore.isOptionsContainerVisible ? 'visible' : ''}`} onClick={toggleMenu}></div>

      {menuStore.isOptionsContainerVisible && (
        <div className={`options-menu ${menuStore.isOptionsContainerVisible ? 'visible' : ''}`}>
          <img onClick={toggleMenu} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+klEQVR4nO2X0Q6CIBSGD/YgHuCRgOVc+Sq8Rd1Ur2pj1UrR1INIa3ybmzf8+8Z+8AiQyWQyHZji/GAQjxagADpMS2yMELV7J6doUVZa8Pbx4JUi5dYogZd3TlmRhYzE/TtouZQvw1uXSRayAIWToEgNyVB3uQ9TAk+fwYrjbSKYsiaaFNOcn2PKLJHaTGaOlCezVmdIRdfE8kfbKZ1QZkIqjQwMdyZ+iRfJJJGyIzdwqlKzL0c7+u3syfgl9nZhMyk2Q2YzKfYzH1cbMEKEjC6jGCHq0AGtL/UcY2loic0aI2xHSmJDFjIAu9dwHjrku4wVfhYymcz/cQd9aCL/JJjd5AAAAABJRU5ErkJggg==" />
          <ul>
            <li>New recipe</li>
            <li>Edit recipe</li>
            <li>Delete recipe</li>
            <li>Back to main page</li>
          </ul>
        </div>
      )}
    </div>
  );
});

export default RecipeDetailPage;