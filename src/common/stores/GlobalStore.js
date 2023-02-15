import { observable, action, makeObservable, runInAction } from 'mobx';
import { getCarsData } from '../services/fetchApiData';
import { getModelsData } from '../services/fetchApiData';
import { getNewModelsData } from '../services/fetchApiData';
import { sortModelsByName } from '../services/fetchApiData';

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
    });
  }

  getCars = () => {
    runInAction(() => {
      getCarsData();
    });
  };

  getModels = (id) => {
    getModelsData(id);
  };

  getNewModels = () => {
    getNewModelsData();
  };

  getModelsByName = (sortType) => {
    sortModelsByName(sortType);
    if (sortType === 'asc') {
      this.lockAscOptions = true;
      this.lockDescOptions = false;
    }
    if (sortType === 'desc') {
      this.lockAscOptions = false;
      this.lockDescOptions = true;
    }
  };
}

const globalStore = new GlobalStore();
export default globalStore;
