import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { db } from '../firebase';
import { ref, set, get, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { throttle } from 'lodash';

class RecipeStore {
    recipes = []; // array for all recipes (Firebase and MealDB)
    recipeDetail = null; // details for the chosen recipe (initially it is null until one recipe is clicked)
    error = ''; // error message value
    newRecipe = { // the object for creating a new recipe (Firebase)
        idMeal: '', // generated with uuid
        strMeal: '', // name of the recipe
        strMealThumb: '', // recipe image
        strCategory: '', // recipe category
        strArea: '', // recipe origin country
        ingredients: [{ ingredient: '', measure: '' }],
        strInstructions: '', 
    };
    // pagination
    currentPage = 1;
    recipesPerPage = 14;
    totalPages = 0;
    // sorting
    sortOption = "titleAsc";
    // cache
    recipeCache = {};
    // filtering
    selectedAreas = [];
    tempSelectedAreas = []; 
    // search
    searchTerm = '';
    searchResults = [];

    constructor(){
        makeObservable(this, {
            // observable values for recipes
            recipes: observable,
            recipeDetail: observable,
            error: observable,
            newRecipe: observable,
            currentPage: observable,
            recipesPerPage: observable,
            totalPages: observable,
            sortOption: observable, 
            recipeCache: observable,
            selectedAreas: observable,
            tempSelectedAreas: observable,
            searchTerm: observable,
            searchResults: observable,
            // action values - functions for recipes
            fetchFirebaseRecipes: action, // fetching Firebase recipes
            fetchRecipesFromMealDB: action, // fetching recipes from MealDB
            fetchAllRecipes: action, // fetching all the recipes of a selected category
            fetchRecipeDetail: action, // fetching the data from a selected recipe
            fetchFirebaseRecipeDetail: action, // also, but from Firebase
            addRecipe: action, // creating a recipe and adding it to the array
            resetNewRecipe: action, // resets the state for new recipe fields
            editRecipe: action, // edits already created Firebase recipes
            deleteRecipe: action,
            updateNewRecipe: action,
            addIngredient: action,
            updateIngredient: action,
            removeIngredient: action,
            setCurrentPage: action,
            setRecipesPerPage: action,
            paginatedRecipes: computed,
            calculatePagination: action,
            setSortOption: action,
            sortRecipes: action,
            setCategory: action,
            setTempSelectedAreas: action,
            applyFilters: action,
            resetFilters: action,
            filteredRecipes: computed,
            setSearchTerm: action,
            filterRecipesBySearch: action,
            searchResultsDisplay: computed,
            resetSearch: action,
        });
    }

    fetchFirebaseRecipes = async (categoryName) => {
        try {
            // we reference the db database and the path which should take us to all recipes
            const recipesRef = ref(db, 'recipes/');
            // state of data on the referenced path
            const snapshot = await get(recipesRef); 
            if (snapshot.exists()) { 
                // all of the recipes found on the /recipes path
                const data = snapshot.val(); 
                 // convert data objects into arrays, so the array of all recipes
                const firebaseRecipes = Object.values(data).filter(recipe => recipe.strCategory === categoryName);
                const uniqueRecipes = [];
            const recipeIds = new Set();

            firebaseRecipes.forEach(recipe => {
                if (!recipeIds.has(recipe.idMeal)) {
                    recipeIds.add(recipe.idMeal);
                    uniqueRecipes.push(recipe);
                }
            });

            console.log('Filtered Firebase Recipes:', uniqueRecipes);
            return uniqueRecipes;
            } else {
            console.log('No Firebase recipes found');
                return [];
            }
        } catch (error) {
        console.log('Error fetching Firebase recipes:', error);
            return [];
        }
    };

    fetchRecipesFromMealDB = throttle(async (categoryName) => {
        if(this.recipeCache[categoryName]){
            return this.recipeCache[categoryName];
        }
        try {
            const response = await fetch(`/api/json/v1/1/filter.php?c=${categoryName}`);
            const data = await response.json();
            const basicRecipes = data.meals || [];
    
            const detailedRecipesPromises = basicRecipes.map(async recipe => {
                const detailResponse = await fetch(`/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
                const detailData = await detailResponse.json();
                return detailData.meals[0];
            });
    
            const detailedRecipes = await Promise.all(detailedRecipesPromises);
            this.recipeCache[categoryName] = detailedRecipes;
            return detailedRecipes;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            runInAction(() => {
                this.error = 'Failed to fetch recipes.';
            });
        }
    }, 5000);
    

    fetchAllRecipes = async (categoryName) => {
        try {
            const apiRecipes = await this.fetchRecipesFromMealDB(categoryName);
            const firebaseRecipes = await this.fetchFirebaseRecipes(categoryName);
            runInAction(() => {
                const allRecipes = [
                    ...apiRecipes,
                    ...firebaseRecipes
                ];
                this.recipes = allRecipes;
                this.sortRecipes();
            });
        } catch (error){
            runInAction(() => {
                this.error = 'Failed to combine recipes.';
            });
        }
    }

    fetchRecipeDetail = async (id) => {
        // find the MealDB recipe with the matching id
        try {
            const response = await fetch(`/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            console.log('MealDB Recipe Data:', data);
            if(data.meals && data.meals.length > 0) {
                const recipe = data.meals[0]; // fetch the first and only recipe that matches the id
                runInAction(() => {
                this.recipeDetail = recipe;
                console.log('MealDB Recipe id:', recipe.idMeal);
            });
            } else {
            console.log('No recipe found for API ID:', id);
                runInAction(() => {
                    this.recipeDetail = null;
                });
            }
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch recipe details.';
            });
        }
    };

    fetchFirebaseRecipeDetail = async (id) => {
        try {
            // Filter the recipes to find the one that matches the id
            const recipe = this.recipes.find(recipe => recipe.idMeal === id);
    
            if (recipe) {
                console.log('Matching Firebase Recipe Found:', recipe);
                runInAction(() => {
                    this.recipeDetail = recipe; // Set the found recipe to recipeDetail
                    this.newRecipe = {
                        idMeal: recipe.idMeal || '',
                        strMeal: recipe.strMeal || '',
                        strMealThumb: recipe.strMealThumb || '',
                        strCategory: recipe.strCategory || '',
                        strArea: recipe.strArea || '',
                        strInstructions: recipe.strInstructions || '',
                        ingredients: recipe.ingredients || []
                    };
                });
            } else {
                console.log('No matching recipe found in Firebase for ID:', id);
                runInAction(() => {
                    this.recipeDetail = null;
                });
            }
        } catch (error) {
            console.log('Error fetching Firebase recipe details:', error);
            runInAction(() => {
                this.error = 'Failed to fetch recipe details.';
            });
        }
    };
    
   addRecipe = async () => {
    try {
        this.newRecipe.idMeal = uuidv4(); // generating a unique id for the new recipe
        const newRecipeRef = ref(db, `recipes/${this.newRecipe.idMeal}`); // creating a reference for the new recipe
        const filteredIngredients = this.newRecipe.ingredients.filter(i => i.ingredient.trim() !== '' && i.measure.trim() !== ''); // filter all the ingredients that are not empty

        const recipeToAdd = {
            idMeal: this.newRecipe.idMeal,
            strMeal: this.newRecipe.strMeal,
            strMealThumb: this.newRecipe.strMealThumb,
            strCategory: this.newRecipe.strCategory,
            strArea: this.newRecipe.strArea,
            strInstructions: this.newRecipe.strInstructions,
            ingredients: filteredIngredients,
        };

        await set(newRecipeRef, recipeToAdd); // saves the recipe to this reference path

        runInAction(() => {
            this.recipes.push(recipeToAdd); // add recipe to the end of other recipes
            this.resetNewRecipe(); // reset the state
        });
    } catch (error) {
        runInAction(() => {
            this.error = 'Failed to add recipe.';
        });
    }
};

resetNewRecipe = () => {
    this.newRecipe = {
        idMeal: '',
        strMeal: '',
        strMealThumb: '',
        strCategory: '',
        strArea: '',
        ingredients: [{ ingredient: '', measure: '' }],
        strInstructions: '',
    };
}

editRecipe = async () => {
    try {
        if (!this.newRecipe.idMeal) {
            throw new Error('ID recepta je obavezan za ažuriranje.');
        }

        const recipeRef = ref(db, `recipes/${this.newRecipe.idMeal}`);
        const filteredIngredients = this.newRecipe.ingredients.filter(i => i.ingredient.trim() !== '' && i.measure.trim() !== '');

        const updatedRecipe = {
            ...this.newRecipe,
            ingredients: filteredIngredients,
        };
        await set(recipeRef, updatedRecipe);

      runInAction(() => {
            const index = this.recipes.findIndex(recipe => recipe.idMeal === this.newRecipe.idMeal);
            if (index !== -1) {
                this.recipes[index] = updatedRecipe;
            } else {
                console.error('Recipe was not found in the store.');
            }
        });

        console.log('Recipe succesfully updated', updatedRecipe);
    } catch (error) {
        runInAction(() => {
            this.error = 'Error while updating recipe.';
        });
        console.error('Error while updating recipe:', error);
    }
};

deleteRecipe = async (idMeal) => {
    try {
        const recipeRef = ref(db, `recipes/${idMeal}`);
        await remove(recipeRef);

        runInAction(() => {
          this.recipes = this.recipes.filter(recipe => recipe.idMeal !== idMeal);
        });

        console.log(`Recipe with ID: ${idMeal} has been deleted.`);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
};

updateNewRecipe = (key, value) => {
    runInAction(() => {
        this.newRecipe[key] = value;
    });
};

    addIngredient = () => {
        if (this.newRecipe.ingredients.length < 20) {
            runInAction(() => {
                this.newRecipe.ingredients.push({ ingredient: '', measure: '' });
            });
        } else {
            alert('You can only add 20 ingredients.');
        }
    }

    updateIngredient = (index, field, value) => {
        runInAction(() => {
            this.newRecipe.ingredients[index][field] = value;
        });
    };

    removeIngredient = (index) => {
        runInAction(() => {
            this.newRecipe.ingredients.splice(index, 1);
        });
    }
    
    setCurrentPage = (pageNumber) => {
        runInAction(() => {
            this.currentPage = pageNumber;
        });
    };

    setRecipesPerPage = (number) => {
        runInAction(() => {
            this.recipesPerPage = number;
        });
    };

    calculatePagination(totalItems = this.filteredRecipes.length) {
    this.totalPages = Math.ceil(totalItems / this.recipesPerPage);
}

    get paginatedRecipes() {
        const startIndex = (this.currentPage - 1) * this.recipesPerPage;
        const endIndex = startIndex + this.recipesPerPage;
        return this.filteredRecipes.slice(startIndex, endIndex);
    }

    setSortOption(option) {
        this.sortOption = option;
        this.sortRecipes();
    }
    
    sortRecipes() {
        switch (this.sortOption) {
            case "titleAsc":
                this.recipes = this.recipes.slice().sort((a, b) => a.strMeal.localeCompare(b.strMeal));
                break;
            case "titleDesc":
                this.recipes = this.recipes.slice().sort((a, b) => b.strMeal.localeCompare(a.strMeal));
                break;
            case "countryAsc":
                this.recipes = this.recipes.slice().sort((a, b) => a.strArea.localeCompare(b.strArea));
                break;
            case "countryDesc":
                this.recipes = this.recipes.slice().sort((a, b) => b.strArea.localeCompare(a.strArea));
                break;
            default:
                break;
        }
    }

    applyFilters = () => {
        this.selectedAreas = [...this.tempSelectedAreas];
        this.tempSelectedAreas = [];
        this.currentPage = 1;
        this.calculatePagination();
    };

    setCategory(category) {
        this.selectedCategory = category;
        this.tempSelectedAreas = [];
        this.selectedAreas = [];
        this.currentPage = 1;
        this.fetchAllRecipes(category);
        this.calculatePagination();
    }

    setTempSelectedAreas(area) {
        if (this.tempSelectedAreas.includes(area)) {
            this.tempSelectedAreas = this.tempSelectedAreas.filter(a => a !== area);
        } else {
            this.tempSelectedAreas.push(area);
        }
    }
    
    get filteredRecipes() {
        const filtered = this.selectedAreas.length === 0 
            ? this.recipes 
            : this.recipes.filter(recipe => this.selectedAreas.includes(recipe.strArea));
        this.calculatePagination(filtered.length); 
        return filtered;
    }

    resetFilters = () => {
        this.selectedAreas = [];
        this.tempSelectedAreas = [];
        this.currentPage = 1;
        this.calculatePagination();
    };

    setSearchTerm(term) {
        this.searchTerm = term;
        this.filterRecipesBySearch();
    }

    filterRecipesBySearch() {
        const lowerCaseTerm = this.searchTerm.toLowerCase();
        
        if (!lowerCaseTerm) {
            this.searchResults = [];
            return;
        }

        let matchedRecipes = this.recipes.filter(recipe => 
            recipe.strMeal.toLowerCase().startsWith(lowerCaseTerm)
        );

        if (matchedRecipes.length < 10) {
            const additionalRecipes = this.recipes.filter(recipe => 
                recipe.strMeal.toLowerCase().includes(lowerCaseTerm) &&
                !matchedRecipes.includes(recipe)
            );
            matchedRecipes = matchedRecipes.concat(additionalRecipes).slice(0, 10);
        }

        this.searchResults = matchedRecipes;
    }

    get searchResultsDisplay() {
        return this.searchResults.length > 0 ? this.searchResults : ["No recipe matches your search"];
    }

    resetSearch = () => {
        this.searchTerm = '';
        this.searchResults = [];
    };
    
}

const recipeStore = new RecipeStore();
export default recipeStore;