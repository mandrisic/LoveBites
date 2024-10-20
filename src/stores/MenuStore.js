import { observable, makeObservable, action } from "mobx";

class MenuStore {
    isOptionsContainerVisible = false;
    isFilterContainerVisible = false;
    isDeleteModalVisible = false;
    isSortMenuOpen = false;

    constructor(){
        makeObservable(this, {
            isOptionsContainerVisible: observable,
            isFilterContainerVisible: observable,
            isDeleteModalVisible: observable,
            isSortMenuOpen: observable,
            toggleOptionsContainer: action,
            toggleFilterContainer: action,
            toggleDeleteModal: action,
            toggleSortMenu: action,
            closeSortMenu: action,
        });
    }

    toggleOptionsContainer(){
        this.isOptionsContainerVisible = !this.isOptionsContainerVisible;
    }

    toggleFilterContainer(){
        this.isFilterContainerVisible = !this.isFilterContainerVisible;
    }

    toggleDeleteModal(){ 
        this.isDeleteModalVisible = !this.isDeleteModalVisible;
    }

    toggleSortMenu() {
        this.isSortMenuOpen = !this.isSortMenuOpen;
    }

    closeSortMenu() {
        this.isSortMenuOpen = false;
    }
}

const menuStore = new MenuStore();
export default menuStore;