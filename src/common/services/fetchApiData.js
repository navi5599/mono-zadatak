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

  if (id === 'all') {
    modelsUrl = 'https://api.baasic.com/v1/myapp-test/resources/VehicleModel';
    //Show the load more button, because we got more than 5 models to show
    globalStore.showLoadButton = true;
  } else {
    modelsUrl += `?searchQuery=WHERE vehiclemakeid = '${id}'`;
    globalStore.showLoadButton = false;
  }

  return axios
    .get(modelsUrl)
    .then((res) => {
      return res.data.item;
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch new models ---

export const getNewModelsData = async () => {
  const currentModels = globalStore.models;

  // Make initial API call to get total number of models
  const response = await axios.get(
    'https://api.baasic.com/v1/myapp-test/resources/VehicleModel'
  );
  const totalCount = response.data.totalRecords;

  if (currentModels.length < totalCount) {
    try {
      const response = await axios.get(
        `https://api.baasic.com/v1/myapp-test/resources/VehicleModel?page=${globalStore.setPage}`
      );
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
    if (currentModels.length < totalCount) {
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
