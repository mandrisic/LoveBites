import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import recipeStore from '../stores/RecipeStore';
import '../css/SearchBar.css';

const SearchBar = observer(() => {
    const handleSearchChange = (e) => {
        recipeStore.setSearchTerm(e.target.value);
    };

    const navigate = useNavigate();

    const handleResultClick = (recipeId, category) => {
        navigate(`/category/${category}/recipe/${recipeId}`);
        recipeStore.resetSearch();
    };

    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder="Find recipes"
                value={recipeStore.searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABU0lEQVR4nO2UTU7DQAyFu+dnBXQZPydqpV6ihQMgpTOzQHANVLFAFNhwG6pyjhZuUihs+ZFnJkFIlJkpIBDCkjeR48958XOj8SejZN5SwLliXCvGg6QGpho4M0Wx+anmBtAaNNeM5/dSge4Uc3/55own2wy4NETdg2ZzRVLlWU8DIwthPBrOymRZqskN0+GiOsU0cBC63Wu1NqIBonk1eahWM42dXDiNBmjGjZ2eqBuq7efZth9mGg1QoHsL6HRWQ7W77faaA9A8GlDrHwHYL4r1ZIDsvNU1z3qhWsO8kyyRmMi/NArWMl35nzyMBohDxUR+BQcfDHLkTTdLdrU4VEzkGtBYtkX+iU0ri5vcD3Gc1Lz+Es5KMdGiU6EZM2n+ejoSZKpCHCom0sBE1tcfu4k8q2R5e5+WgIRC+ZNRJ3DxD/lNctHJlwMa7uQPv2WjfjReAJ8GujnpKXWWAAAAAElFTkSuQmCC" />
            {recipeStore.searchTerm && (
                <div className="search-results">
                    {recipeStore.searchResultsDisplay.length > 0 ? (
                        recipeStore.searchResultsDisplay.map((result, index) => (
                            <div
                                key={result.idMeal || index}
                                className="search-result-item"
                                onClick={() => handleResultClick(result.idMeal, result.strCategory)}
                            >
                                {result.strMeal || result}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">No recipe matches your search</div>
                    )}
                </div>
            )}
        </div>
    );
});

export default SearchBar;