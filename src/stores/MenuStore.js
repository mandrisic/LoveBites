import { observable, makeObservable, action } from "mobx";

class MenuStore {
    isOptionsContainerVisible = false;
    isFilterContainerVisible = false;
    isSortContainerVisible = false;
    isDeleteModalVisible = false;

    constructor(){
        makeObservable(this, {
            isOptionsContainerVisible: observable,
            isFilterContainerVisible: observable,
            isSortContainerVisible: observable,
            isDeleteModalVisible: observable,
            toggleOptionsContainer: action,
            toggleFilterContainer: action,
            toggleSortContainer: action,
            toggleDeleteModal: action,
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

    toggleDeleteModal(){ 
        this.isDeleteModalVisible = !this.isDeleteModalVisible;
    }
}

const menuStore = new MenuStore();
export default menuStore;