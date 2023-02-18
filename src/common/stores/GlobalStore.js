import { observable, action, makeObservable, runInAction } from 'mobx';
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
      getCars: action,
      getModels: action,
      getNewModels: action,
      getModelsByName: action,
      resetStates: action,
    });
  }

  getCars = () => {
    getCarsData();
  };

  getModels = async (id) => {
    const models = await getModelsData(id);
    runInAction(() => {
      this.models = models;
    });
  };

  getNewModels = () => {
    getNewModelsData();
  };

  getModelsByName = (sortType) => {
    runInAction(() => {
      sortModelsByName(sortType);
      if (sortType === 'asc') {
        this.lockAscOptions = true;
        this.lockDescOptions = false;
      }
      if (sortType === 'desc') {
        this.lockAscOptions = false;
        this.lockDescOptions = true;
      }
    });
  };

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
