import {
  observable,
  action,
  makeObservable,
  computed,
  flow,
  runInAction,
} from 'mobx';
import { getCarsData } from '../services/fetchApiData';
import { getModelsData } from '../services/fetchApiData';
import { getNewModelsData } from '../services/fetchApiData';
import { sortModelsByName } from '../services/fetchApiData';

import sidebarStore from '../../stores/SideBarStore';

class GlobalStore {
  cars = [];
  models = [];
  showLoadButton = false;
  setPage = 2;
  totalRecords = 0;

  lockAscOptions = false;
  lockDescOptions = false;

  constructor() {
    makeObservable(this, {
      cars: observable,
      models: observable,
      showLoadButton: observable,
      setPage: observable,
      lockAscOptions: observable,
      lockDescOptions: observable,
      totalRecords: observable,
      getCars: flow,
      getModels: flow,
      getNewModels: action,
      getModelsByName: flow,
      resetStates: action,
      filteredModels: computed,
    });
  }

  get filteredModels() {
    return this.models.filter((car) => {
      return sidebarStore.searchedCar.toLowerCase() === ''
        ? car
        : car.name.toLowerCase().includes(sidebarStore.searchedCar);
    });
  }

  *getCars() {
    const cars = yield getCarsData();
    this.cars = cars;
    console.log('get cars called');
  }

  *getModels(id) {
    const models = yield getModelsData(id);
    this.models = models.item;
    this.totalRecords = models.totalRecords;
    runInAction(() => {
      if (this.models.length >= 10) {
        this.showLoadButton = true;
      }
    });
  }

  getNewModels = (carId) => {
    if (this.models.length === this.totalRecords) {
      this.showLoadButton = false;
    }
    getNewModelsData(carId);
  };

  *getModelsByName(carId, sortType) {
    const response = yield sortModelsByName(carId, sortType);
    this.models = response;

    if (sortType === 'asc') {
      this.lockAscOptions = true;
      this.lockDescOptions = false;
    }
    if (sortType === 'desc') {
      this.lockAscOptions = false;
      this.lockDescOptions = true;
    }
  }

  resetStates = () => {
    this.setPage = 2;
    this.lockAscOptions = false;
    this.lockDescOptions = false;
    this.showLoadButton = false;
    sidebarStore.lockAscPriceOptions = false;
    sidebarStore.lockDescPriceOptions = false;
    sidebarStore.lockBenzinOption = false;
    sidebarStore.lockDieselOption = false;
    sidebarStore.lockHybridOption = false;
  };
}

const globalStore = new GlobalStore();
export default globalStore;
