import { observable, action, makeObservable, flow, runInAction } from 'mobx';
import globalStore from '../common/stores/GlobalStore';

import { sortModelsByMotortype } from '../common/services/fetchApiData';

//Helper function to sort models by price
const sortModelsByPrice = (sortType) => {
  const currentModels = globalStore.models;
  const sortedModels = currentModels.sort((a, b) => {
    let priceA = parseInt(a.price);
    let priceB = parseInt(b.price);
    if (sortType === 'asc') {
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
  showNameOptions = false;
  showPriceOptions = false;
  showMotortypeOptions = false;

  lockAscPriceOptions = false;
  lockDescPriceOptions = false;

  lockBenzinOption = false;
  lockDieselOption = false;
  lockHybridOption = false;

  showAddModel = false;

  constructor() {
    makeObservable(this, {
      searchedCar: observable,
      showNameOptions: observable,
      showPriceOptions: observable,
      lockAscPriceOptions: observable,
      lockDescPriceOptions: observable,
      showMotortypeOptions: observable,
      lockBenzinOption: observable,
      lockDieselOption: observable,
      lockHybridOption: observable,
      showAddModel: observable,
      sortByMotortype: flow,
      sortModels: action,
      toggleOptions: action,
      handleModal: action,
    });
  }

  handleModal = () => {
    runInAction(() => {
      this.showAddModel = !this.showAddModel;
    });
  };

  //Show or hide options
  toggleOptions = (option) => {
    if (option === 'name_opt')
      return (this.showNameOptions = !this.showNameOptions);
    if (option === 'price_opt')
      return (this.showPriceOptions = !this.showPriceOptions);
    if (option === 'motortype_opt')
      return (this.showMotortypeOptions = !this.showMotortypeOptions);
  };

  sortModels = (sortType) => {
    sortModelsByPrice(sortType);

    //Show notification that some of options were chosen
    if (sortType === 'asc') {
      this.lockAscPriceOptions = true;
      this.lockDescPriceOptions = false;
    }
    if (sortType === 'desc') {
      this.lockAscPriceOptions = false;
      this.lockDescPriceOptions = true;
    }
  };

  *sortByMotortype(carId, sortType) {
    const response = yield sortModelsByMotortype(carId, sortType);

    globalStore.models = response;

    //Show notification that some of options were chosen
    if (sortType === 'Benzin') {
      this.lockBenzinOption = true;
      this.lockDieselOption = false;
      this.lockHybridOption = false;
    }
    if (sortType === 'Diesel') {
      this.lockBenzinOption = false;
      this.lockDieselOption = true;
      this.lockHybridOption = false;
    }
    if (sortType === 'Hybrid') {
      this.lockBenzinOption = false;
      this.lockDieselOption = false;
      this.lockHybridOption = true;
    }
  }
}

const sidebarStore = new SideBarStore();
export default sidebarStore;
