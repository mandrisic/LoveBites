import { observable, makeObservable, action } from "mobx";

class MenuStore {
    isOptionsContainerVisible = false;
    isFilterContainerVisible = false;
    isSortContainerVisible = false;

    constructor(){
        makeObservable(this, {
            isOptionsContainerVisible: observable,
            isFilterContainerVisible: observable,
            isSortContainerVisible: observable,
            toggleOptionsContainer: action,
            toggleFilterContainer: action,
            toggleSortContainer: action,
        });
    }

    toggleOptionsContainer(){
        this.isOptionsContainerVisible = !this.isOptionsContainerVisible;
    }

    toggleFilterContainer(){
        this.isFilterContainerVisible = !this.isFilterContainerVisible;
    }

    toggleSortContainer(){
        this.isSortContainerVisible = !this.isSortContainerVisible;
    }
}

const menuStore = new MenuStore();
export default menuStore;