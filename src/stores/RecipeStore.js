import { makeObservable, observable, action, runInAction } from 'mobx';

class RecipeStore {
    recipes = [];
    error = '';

    constructor(){
        makeObservable(this, {
            recipes: observable,
            error: observable,
            fetchRecipes: action,
        });
    }
    
    fetchRecipes = async (categoryName) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
            const data = await response.json();
            runInAction(() => {
                this.recipes = data.meals;
            });
        } catch (error){
            console.error('Error fetching recipes:', error);
            runInAction(() => {
                this.error = 'Failed to fetch recipes.';
            });
        }
    }
}

const recipeStore = new RecipeStore();
export default recipeStore;