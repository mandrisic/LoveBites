import { makeObservable, observable, action, runInAction } from 'mobx';

class RecipeStore {
    recipes = [];
    recipeDetail = null;
    error = '';

    constructor(){
        makeObservable(this, {
            recipes: observable,
            recipeDetail: observable,
            error: observable,
            fetchRecipes: action,
            fetchRecipeDetail: action,
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

    fetchRecipeDetail = async (id) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            runInAction(() => {
                this.recipeDetail = data.meals[0];
            });
        } catch (error){
            console.error('Error fetching recipe details:', error);
            runInAction(() => {
                this.error = 'Failed to fetch recipe details.';
            });
        }
    }
}

const recipeStore = new RecipeStore();
export default recipeStore;