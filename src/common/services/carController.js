import axios from 'axios';

import carControllerStore from '../../stores/carControllerStore';
import { notifySuccess } from './notify';
import { notifyError } from './notify';

import sidebarStore from '../../stores/SideBarStore';
import globalStore from '../stores/GlobalStore';

// CREATE NEW BRAND
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
      notifySuccess('New brand added');
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

// CREATE NEW MODEL
export const createNewModel = async (carId) => {
  const token = localStorage.getItem('token');

  const url = 'https://api.baasic.com/v1/myapp-test/resources/VehicleModel';

  const data = {
    name: carControllerStore.modelName,
    image: carControllerStore.image,
    motortype: carControllerStore.motortype,
    horsepower: carControllerStore.horsepower,
    price: carControllerStore.price,
    vehiclemakeid: carId,
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
      console.log('New model added', response);
      notifySuccess('New model added');
      sidebarStore.showAddModel = false;
      globalStore.getModels(carId);
    } else {
      console.log('Error:', response.status);
      notifyError(response.status);
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE MODEL

export const deleteModel = async (carId, modelId) => {
  const token = localStorage.getItem('token');

  const url = `https://api.baasic.com/v1/myapp-test/resources/VehicleModel/${modelId}`;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(url, headers);
    if (response.status === 204) {
      console.log('Model deleted', response);
      notifySuccess('Model deleted');
      globalStore.getModels(carId);
    } else {
      console.log('Error:', response.status);
      notifyError(response.status);
    }
  } catch (err) {
    console.log(err);
  }
};
