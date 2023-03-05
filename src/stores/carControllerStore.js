import { makeObservable, observable } from 'mobx';

class CarControllerStore {
  name = '';
  abbrv = '';
  description = '';
  logo = '';

  modelName = '';
  image = '';
  motortype = '';
  horsepower = '';
  price = '';

  constructor() {
    makeObservable(this, {
      name: observable,
      modelName: observable,
      abbrv: observable,
      description: observable,
      logo: observable,
      image: observable,
      motortype: observable,
      horsepower: observable,
      price: observable,
    });
  }
}

const carControllerStore = new CarControllerStore();
export default carControllerStore;
