import { makeObservable, observable } from 'mobx';

class CarControllerStore {
  name = '';
  abbrv = '';
  description = '';
  logo = '';

  constructor() {
    makeObservable(this, {
      name: observable,
      abbrv: observable,
      description: observable,
      logo: observable,
    });
  }
}

const carControllerStore = new CarControllerStore();
export default carControllerStore;
