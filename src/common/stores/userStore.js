import { makeObservable, observable } from 'mobx';

class UserStore {
  username = '';
  password = '';

  constructor() {
    makeObservable(this, {
      username: observable,
      password: observable,
    });
  }
}

const userStore = new UserStore();
export default userStore;
