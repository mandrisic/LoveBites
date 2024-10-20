import React from 'react';
import { observer } from 'mobx-react-lite';
import menuStore from '../stores/MenuStore';
import recipeStore from '../stores/RecipeStore';
import '../css/SortMenu.css';

const SortMenu = observer(() => {
    const handleSort = (option) => {
        recipeStore.setSortOption(option);
        menuStore.closeSortMenu();
    };

    return (
        <div>
            <div className="create-icon" onClick={() => menuStore.toggleSortMenu()}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABCElEQVR4nO2XTQ6CMBCFewJPYNJOyw3cyMata+l05S28gJyHi3AbExL3mkYBw4+0MKSivqSrZvq+zEyZwthfDjpE0ZqFkgZINYjiwPk2iDlKuNmlJVwTIXYucSghK+NIzNETYjKA7jCvIEAURvH4XbwBOD0hMlJzHFEOcnOcC+IYRSsEMK1Vm+bNvUSIPXkJmnoBcD6M5BYsGoBUuEQAo3hcNupv9gCSAsAjlUOf39kAxui7ADB4D8jwAJlddsB07duB1DHA8gq8Y8DZwceoZJTaaAkX1zGOUpzJzP0hRpjjQAlqCB7b51r/Uw5Sb3PfJuzPxIS0o+ctaEPMUHN3iADmH/E7x5akO4ORGxq3GGMKAAAAAElFTkSuQmCC" />
            </div>

            {menuStore.isSortMenuOpen && (
                <div className="sort-menu">
                    <img className='closeBtn' onClick={() => menuStore.closeSortMenu()} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+klEQVR4nO2X0Q6CIBSGD/YgHuCRgOVc+Sq8Rd1Ur2pj1UrR1INIa3ybmzf8+8Z+8AiQyWQyHZji/GAQjxagADpMS2yMELV7J6doUVZa8Pbx4JUi5dYogZd3TlmRhYzE/TtouZQvw1uXSRayAIWToEgNyVB3uQ9TAk+fwYrjbSKYsiaaFNOcn2PKLJHaTGaOlCezVmdIRdfE8kfbKZ1QZkIqjQwMdyZ+iRfJJJGyIzdwqlKzL0c7+u3syfgl9nZhMyk2Q2YzKfYzH1cbMEKEjC6jGCHq0AGtL/UcY2loic0aI2xHSmJDFjIAu9dwHjrku4wVfhYymcz/cQd9aCL/JJjd5AAAAABJRU5ErkJggg==" />
                    <p onClick={() => handleSort('titleAsc')}>Recipe name (A-Z)</p>
                    <p onClick={() => handleSort('titleDesc')}>Recipe name (Z-A)</p>
                    <p onClick={() => handleSort('countryAsc')}>Recipe origin (A-Z)</p>
                    <p onClick={() => handleSort('countryDesc')}>Recipe origin (Z-A)</p>
                </div>
            )}
        </div>
    );
});

export default SortMenu;