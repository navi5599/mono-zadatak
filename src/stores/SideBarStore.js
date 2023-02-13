import { observable, action, makeObservable } from 'mobx';
import globalStore from '../common/stores/GlobalStore';

//Helper function to sort models by price
const sortModelsByPrice = (sortType) => {
  const currentModels = globalStore.models;
  const sortedModels = currentModels.sort((a, b) => {
    let priceA = parseInt(a.price);
    let priceB = parseInt(b.price);
    if (sortType === 'asce') {
      return priceA - priceB;
    } else if (sortType === 'desc') {
      return priceB - priceA;
    }
    return currentModels;
  });

  return (globalStore.models = sortedModels);
};

// MobX store implementation

class SideBarStore {
  searchedCar = '';

  showFilter = false;
  showSort = false;

  showNameOptionSort = false;
  showPriceOptionSort = false;

  constructor() {
    makeObservable(this, {
      searchedCar: observable,
      showFilter: observable,
      showSort: observable,
      showNameOptionSort: observable,
      showPriceOptionSort: observable,
      handleFilterAndSort: action,
      handleSortOptions: action,
      sortModels: action,
    });
  }

  handleSortOptions = (id) => {
    if (id === 'sort_name')
      return (this.showNameOptionSort = !this.showNameOptionSort);
    if (id === 'price_name')
      return (this.showPriceOptionSort = !this.showPriceOptionSort);
  };

  handleFilterAndSort = (id) => {
    if (id === 'filter') return (this.showFilter = !this.showFilter);
    if (id === 'sort') return (this.showSort = !this.showSort);
  };

  sortModels = (sortType) => {
    sortModelsByPrice(sortType);
  };
}

const sidebarStore = new SideBarStore();
export default sidebarStore;
