import { makeObservable, observable } from 'mobx';

class CarControllerStore {
  brandName = '';
  abbrv = '';
  description = '';
  logo = '';

  name = '';
  image = '';
  motortype = '';
  horsepower = '';
  price = '';

  constructor() {
    makeObservable(this, {
      name: observable,
      brandName: observable,
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
