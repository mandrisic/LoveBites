import { makeObservable, observable, action, runInAction } from 'mobx';

class CategoryStore {
    categories = [];
    error = '';

    constructor(){
        makeObservable(this, {
            categories: observable,
            error: observable,
            fetchCategories: action
        });
    }

    fetchCategories = async () => {
        try {
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
}

const categoryStore = new CategoryStore();
export default categoryStore;