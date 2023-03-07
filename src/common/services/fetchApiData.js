import axios from 'axios';
import { runInAction } from 'mobx';
import globalStore from '../stores/GlobalStore';

//get all cars from api service and save it to the cars array in store
export const getCarsData = () => {
  return axios
    .get('https://api.baasic.com/v1/myapp-test/resources/VehicleMake')
    .then((res) => {
      return res.data.item;
    })
    .catch((err) => {
      console.log(err);
    });
};

//get all models from api service and save it to the models array in store

export const getModelsData = (id) => {
  let modelsUrl = 'https://api.baasic.com/v1/myapp-test/resources/VehicleModel';

  if (id !== 'all') {
    modelsUrl += `?searchQuery=WHERE vehiclemakeid = '${id}'`;
  }

  return axios
    .get(modelsUrl)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch new models ---

export const getNewModelsData = async (carId) => {
  const currentModels = globalStore.models;
  const totalRecords = globalStore.totalRecords;

  let url = `https://api.baasic.com/v1/myapp-test/resources/VehicleModel?page=${globalStore.setPage}`;

  if (carId !== 'all') {
    url += `&searchQuery=WHERE vehiclemakeid ='${carId}'`;
  }

  if (currentModels.length < totalRecords) {
    try {
      const response = await axios.get(url);
      runInAction(() => {
        const newModels = response.data.item;
        globalStore.models = [...currentModels, ...newModels];
        console.log('New models added');
      });
    } catch (error) {
      console.log(error);
    }
  }

  runInAction(() => {
    if (globalStore.models.length === globalStore.totalRecords) {
      globalStore.showLoadButton = false;
    }
  });

  runInAction(() => {
    if (currentModels.length < totalRecords) {
      globalStore.setPage++;
    }
  });
};

//Sort models by name ---

export const sortModelsByName = (carId, sortType) => {
  let url = 'https://api.baasic.com/v1/myapp-test/resources/VehicleModel';

  if (carId === 'all') {
    url += `?sort=name|${sortType}`;
  } else {
    url += `?searchQuery=WHERE vehiclemakeid ='${carId}'&sort=name|${sortType}`;
  }

  return axios
    .get(url)
    .then((response) => response.data.item)
    .catch((err) => {
      console.log(err);
    });
};

//Sort models by motortype ---

export const sortModelsByMotortype = (carId, sortType) => {
  let url = 'https://api.baasic.com/v1/myapp-test/resources/VehicleModel';

  if (carId === 'all') {
    url += `?searchQuery=WHERE motortype='${sortType}'`;
  } else {
    url += `?searchQuery=WHERE vehiclemakeid ='${carId}' AND motortype='${sortType}'`;
  }

  return axios
    .get(url)
    .then((res) => res.data.item)
    .catch((err) => console.log(err));
};
