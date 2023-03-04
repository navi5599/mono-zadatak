import axios from 'axios';

import carControllerStore from '../../stores/carControllerStore';
import { notifySuccess } from './notify';
import { notifyError } from './notify';

export const createNewBrand = async () => {
  const token = localStorage.getItem('token');

  const url = 'https://api.baasic.com/v1/myapp-test/resources/VehicleMake';

  const data = {
    name: carControllerStore.name,
    abbrv: carControllerStore.abbrv,
    description: carControllerStore.description,
    logo: carControllerStore.logo,
  };

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(url, data, headers);
    if (response.status === 201) {
      console.log('New brand added', response);
      notifySuccess();
      setTimeout(() => {
        window.open('/', '_self');
      }, 2000);
    } else {
      console.log('Error:', response.status);
      notifyError(response.status);
    }
  } catch (err) {
    console.log(err);
  }
};
