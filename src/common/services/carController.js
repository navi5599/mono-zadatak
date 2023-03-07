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
    name: carControllerStore.brandName,
    abbrv: carControllerStore.abbrv,
    description: carControllerStore.description,
    logo: carControllerStore.logo,
  };

  const resetData = () => {
    carControllerStore.brandName = '';
    carControllerStore.abbrv = '';
    carControllerStore.description = '';
    carControllerStore.logo = '';
  };

  if (carControllerStore.brandName === '' || carControllerStore.abbrv === '') {
    notifyError('Name and Abbreviation are required');
    return;
  }

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

      resetData();
      setTimeout(() => {
        window.open('/', '_self');
      }, 2000);
    } else {
      console.log('Error:', response.status);
      notifyError(response.status);
    }
  } catch (err) {
    console.log(err);
    notifyError();
  }
};

// CREATE NEW MODEL
export const createNewModel = async (carId) => {
  const token = localStorage.getItem('token');

  const url = 'https://api.baasic.com/v1/myapp-test/resources/VehicleModel';

  const data = {
    name: carControllerStore.name,
    image: carControllerStore.image,
    motortype: carControllerStore.motortype,
    horsepower: carControllerStore.horsepower,
    price: carControllerStore.price,
    vehiclemakeid: carId,
  };

  if (carControllerStore.name === '') {
    notifyError('Model name is required');
    return;
  }

  const resetData = () => {
    Object.keys(data).forEach((key) => {
      if (key !== 'vehiclemakeid') {
        carControllerStore[key] = '';
      }
    });
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
      //Reset all input fields if model is added successfully
      resetData();
    } else {
      console.log('Error:', response.status);
      notifyError(response.status);
    }
  } catch (err) {
    console.log(err);
  }
};

//UPDATE CAR MODEL

export const updateModel = async (
  carId,
  modelId,
  currentModel,
  handleCancelEditClick
) => {
  const token = localStorage.getItem('token');

  const url = `https://api.baasic.com/v1/myapp-test/resources/VehicleModel/${modelId}`;

  const data = {
    name: currentModel.name,
    image: currentModel.image,
    motortype: currentModel.motortype,
    horsepower: currentModel.horsepower,
    price: currentModel.price,
    vehiclemakeid: carId,
  };

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.patch(url, data, headers);
    if (response.status === 200 || response.status === 204) {
      console.log('Model updated', response);
      notifySuccess('Model successfully updated');
      globalStore.getModels(carId);
      //Remove editing card
      handleCancelEditClick();
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
