import { observable, action, makeObservable } from 'mobx';

class SideBarStore {
  searchedCar = '';
  showFilter = false;
  showSort = false;

  constructor() {
    makeObservable(this, {
      searchedCar: observable,
      showFilter: observable,
      handleFilter: action,
    });
  }

  handleFilter = () => {
    this.showFilter = !this.showFilter;
  };
}

const sidebarStore = new SideBarStore();
export default sidebarStore;
