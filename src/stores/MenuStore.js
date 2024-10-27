import { observable, makeObservable, action } from "mobx";

class MenuStore {
    isOptionsContainerVisible = false;
    isFilterMenuOpen = false;
    isDeleteModalVisible = false;
    isSortMenuOpen = false;

    constructor(){
        makeObservable(this, {
            isOptionsContainerVisible: observable,
            isFilterMenuOpen: observable,
            isDeleteModalVisible: observable,
            isSortMenuOpen: observable,
            toggleOptionsContainer: action,
            toggleFilterMenu: action,
            closeFilterMenu: action,
            toggleDeleteModal: action,
            toggleSortMenu: action,
            closeSortMenu: action,
        });
    }

    toggleOptionsContainer(){
        this.isOptionsContainerVisible = !this.isOptionsContainerVisible;
    }

    toggleFilterMenu(){
        this.isFilterMenuOpen = !this.isFilterMenuOpen;
    }

    closeFilterMenu() {
        this.isFilterMenuOpen = false;
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