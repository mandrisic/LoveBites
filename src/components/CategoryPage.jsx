import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import recipeStore from '../stores/RecipeStore';
import NavBar from './NavBar';
import Recipes from './Recipes';
import '../css/CategoryPage.css';

const CategoryPage = observer(() => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    recipeStore.fetchAllRecipes(categoryName);
  }, [categoryName]);

  return (
    <>
    <NavBar />
    <div className='category-container'>
      <div className="category-choices">
        <h2 className='categoryName'>{categoryName}</h2>
        <div className="icons-container">
          <div className='back' onClick={() => navigate(-1)}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABJ0lEQVR4nO2WwS4EQRCG686RJV4Gj0D2LbiKMx6IeA9Mqjp2JSu2asKYTJWwXFmp3dlkj2ZGZkL6S/rY/f/9d1d1A0Qi/4lCwkH+EDY7EVfBQxOamtCgExPZKOmpYJiZYLoreLAVTVhMQv76nchGSc8Yz5Txxpg+yjJrMPDW1/yRuI5D3xgnzUVrGNBx6CvjVxnd+YvgdpYlK5XiAwBvSN6YKjWobB77YudHVUUbiTt+5oudQ9vijjImPtFjh7bFHWN898l5HlahIs/3uLFUdsNatW/l+Vc18CvizqzmhaZFSjvQxXNsTKflQhedfEgmT9frJvg2jxKPoQs0pX1l/HQTKnhZpLRb51I2MyG4p0Kvy60U2mbyOFwzphMTuvLybN1AJAIt8A1KZh3EE33bygAAAABJRU5ErkJggg=="></img>
          </div>
          <div className="create-icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABH0lEQVR4nO2UMU4DMRBFZ2tQ2nS7/pOtVlyDBirwWCmg4Aa0JLkMoqMADkMEl0BUSDSJEnllxAqCsraJEZKf5MKyZv7M+GuIMpkNCGO1i0P/pwCoeRsEdUdEBYVT2Bwu17x3lClLCPBiAzUwDVU3wKzNwXg1o1HtG3yoGQvNWBrm4wDxqPgW231IB90JCjChCAph3DoTPZ/V9WCreNPsC9SjE3+I9BD5JvQuuBfjqlJ9Rhr6Zd6mOmU+8n3/FQSYbOqwOyHDfEU7pOj88bejgfto0/Uy5Q8F2DdKgXzZ7d67PhcQi+Qv4E/Tmbps/syEhqsLzXhzy+kpeQHysYAYN8l2gKUj/G5YXVJqxI38hPkgubhFgOvz4XCvvWQyFMcamP72zm23suUAAAAASUVORK5CYII=" />
          </div>
          <div className="create-icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABCElEQVR4nO2XTQ6CMBCFewJPYNJOyw3cyMata+l05S28gJyHi3AbExL3mkYBw4+0MKSivqSrZvq+zEyZwthfDjpE0ZqFkgZINYjiwPk2iDlKuNmlJVwTIXYucSghK+NIzNETYjKA7jCvIEAURvH4XbwBOD0hMlJzHFEOcnOcC+IYRSsEMK1Vm+bNvUSIPXkJmnoBcD6M5BYsGoBUuEQAo3hcNupv9gCSAsAjlUOf39kAxui7ADB4D8jwAJlddsB07duB1DHA8gq8Y8DZwceoZJTaaAkX1zGOUpzJzP0hRpjjQAlqCB7b51r/Uw5Sb3PfJuzPxIS0o+ctaEPMUHN3iADmH/E7x5akO4ORGxq3GGMKAAAAAElFTkSuQmCC" />
          </div>
        </div>
      </div>

      {recipeStore.error && <p>{recipeStore.error}</p>}
        {!recipeStore.error && <Recipes />}

    </div>
    </>
  )
});

export default CategoryPage
