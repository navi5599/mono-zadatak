import { observable, action, makeObservable, runInAction } from 'mobx';
import { getCarsData } from '../services/fetchApiData';
import { getModelsData } from '../services/fetchApiData';
import { getNewModelsData } from '../services/fetchApiData';

class GlobalStore {
  cars = [];
  models = [];
  showLoadButton = false;
  setPage = 2;

  constructor() {
    makeObservable(this, {
      cars: observable,
      models: observable,
      showLoadButton: observable,
      setPage: observable,
      getCars: action,
      getModels: action,
      getNewModels: action,
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
}

const globalStore = new GlobalStore();
export default globalStore;
