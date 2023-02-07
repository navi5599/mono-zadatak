import { observable, action, makeObservable, runInAction } from 'mobx';
import { getCarsData } from '../services/fetchApiData';
import { getModelsData } from '../services/fetchApiData';

class GlobalStore {
  cars = [];
  models = [];

  constructor() {
    makeObservable(this, {
      cars: observable,
      models: observable,
      getCars: action,
      getModels: action,
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
}

const globalStore = new GlobalStore();
export default globalStore;
