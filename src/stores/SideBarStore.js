import { observable, action, makeObservable } from 'mobx';

class SideBarStore {
  searchedCar = '';
  showFilter = false;
  showSort = false;

  constructor() {
    makeObservable(this, {
      searchedCar: observable,
      showFilter: observable,
      showSort: observable,
      handleFilter: action,
      handleSort: action,
    });
  }

  handleFilter = () => {
    this.showFilter = !this.showFilter;
  };

  handleSort = () => {
    this.showSort = !this.showSort;
  };
}

const sidebarStore = new SideBarStore();
export default sidebarStore;
