import { makeObservable, observable, action, runInAction } from 'mobx';

class CategoryStore {
    categories = [];
    areas = [];
    error = '';

    constructor(){
        makeObservable(this, {
            categories: observable,
            areas: observable,
            error: observable,
            fetchCategories: action,
            fetchAreas: action,
            fetchAreasForFiltering: action
        });
    }

    fetchCategories = async () => {
        try {
            this.error = ''; // Clear previous errors
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            runInAction(() => {
                this.categories = data.categories;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch categories.';
            });
        }
    }

    fetchAreas = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await response.json();
        runInAction(() => {
            this.areas = data.meals.map(meal => meal.strArea);
        });
    } catch (error) {
        runInAction(() => {
            this.error = 'Failed to fetch areas.';
        });
    }
}

    fetchAreasForFiltering = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            const data = await response.json();
            runInAction(() => {
                this.areas = data.meals.map(meal => meal.strArea);
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch areas.';
            });
        }
    }
}

const categoryStore = new CategoryStore();
export default categoryStore;