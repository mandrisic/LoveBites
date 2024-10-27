import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import recipeStore from "../stores/RecipeStore";
import categoryStore from "../stores/CategoryStore";
import menuStore from "../stores/MenuStore";
import '../css/FilterMenu.css';

const FilterMenu = observer(() => {
  useEffect(() => {
    categoryStore.fetchAreasForFiltering();
  }, []);

  useEffect(() => {
    if (menuStore.isFilterMenuOpen) {
      recipeStore.resetFilters();
    }
  }, [menuStore.isFilterMenuOpen]);

  const handleCountryChange = (event) => {
    const area = event.target.id;
    recipeStore.setTempSelectedAreas(area);
  };

  const handleFilter = () => {
    recipeStore.applyFilters();
    menuStore.closeFilterMenu();
  };
  
  return (
    <div>
      <div className="create-icon" onClick={() => menuStore.toggleFilterMenu()}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABH0lEQVR4nO2UMU4DMRBFZ2tQ2nS7/pOtVlyDBirwWCmg4Aa0JLkMoqMADkMEl0BUSDSJEnllxAqCsraJEZKf5MKyZv7M+GuIMpkNCGO1i0P/pwCoeRsEdUdEBYVT2Bwu17x3lClLCPBiAzUwDVU3wKzNwXg1o1HtG3yoGQvNWBrm4wDxqPgW231IB90JCjChCAph3DoTPZ/V9WCreNPsC9SjE3+I9BD5JvQuuBfjqlJ9Rhr6Zd6mOmU+8n3/FQSYbOqwOyHDfEU7pOj88bejgfto0/Uy5Q8F2DdKgXzZ7d67PhcQi+Qv4E/Tmbps/syEhqsLzXhzy+kpeQHysYAYN8l2gKUj/G5YXVJqxI38hPkgubhFgOvz4XCvvWQyFMcamP72zm23suUAAAAASUVORK5CYII=" />
      </div>

      {menuStore.isFilterMenuOpen && (
        <div className="filter-menu">
          <img
            className="closeBtn"
            onClick={() => menuStore.closeFilterMenu()}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+klEQVR4nO2X0Q6CIBSGD/YgHuCRgOVc+Sq8Rd1Ur2pj1UrR1INIa3ybmzf8+8Z+8AiQyWQyHZji/GAQjxagADpMS2yMELV7J6doUVZa8Pbx4JUi5dYogZd3TlmRhYzE/TtouZQvw1uXSRayAIWToEgNyVB3uQ9TAk+fwYrjbSKYsiaaFNOcn2PKLJHaTGaOlCezVmdIRdfE8kfbKZ1QZkIqjQwMdyZ+iRfJJJGyIzdwqlKzL0c7+u3syfgl9nZhMyk2Q2YzKfYzH1cbMEKEjC6jGCHq0AGtL/UcY2loic0aI2xHSmJDFjIAu9dwHjrku4wVfhYymcz/cQd9aCL/JJjd5AAAAABJRU5ErkJggg=="
          />
        <h2>Country</h2>
          <hr />
          <div className="country-options">
            {categoryStore.areas.map((area, index) => (
              <div key={index} className="area">
                <input
                  id={area}
                  type="checkbox"
                  checked={recipeStore.tempSelectedAreas.includes(area)}
                  onChange={handleCountryChange}
                />
                <label htmlFor={area}>{area}</label>
              </div>
            ))}
          </div>
          <button onClick={handleFilter}>Apply Filter</button>
        </div>
      )}
    </div>
  );
});

export default FilterMenu;
