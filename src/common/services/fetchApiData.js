import axios from 'axios';
import { runInAction } from 'mobx';
import globalStore from '../stores/GlobalStore';

//get all cars from api service and save it to the cars array in store
export const getCarsData = async () => {
  try {
    const response = await axios.get(
      'https://api.baasic.com/beta/myapp-test/resources/VehicleMake'
    );
    runInAction(() => {
      globalStore.cars = response.data.item;
      console.log(response.data.item);
    });
  } catch (error) {
    console.log(error);
  }
};

//get all models from api service and save it to the models array in store

export const getModelsData = (id) => {
  let modelsUrl =
    'https://api.baasic.com/beta/myapp-test/resources/VehicleModel';

  if (id === 'all') {
    modelsUrl = 'https://api.baasic.com/beta/myapp-test/resources/VehicleModel';
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

  if (currentModels.length < 25) {
    try {
      const response = await axios.get(
        `https://api.baasic.com/beta/myapp-test/resources/VehicleModel?page=${globalStore.setPage}`
      );
      runInAction(() => {
        globalStore.models = [...currentModels, ...response.data.item];
        console.log('New models added');
      });
    } catch (error) {
      console.log(error);
    }
  }

  runInAction(() => {
    globalStore.setPage++;
  });
};

//Sort models by name ---

export const sortModelsByName = async (sortType) => {
  let url = 'https://api.baasic.com/beta/myapp-test/resources/VehicleModel';

  const carId = localStorage.getItem('carId');

  try {
    if (carId === 'all') {
      url += `?sort=name|${sortType}`;
    } else {
      url += `?searchQuery=WHERE vehiclemakeid ='${carId}'&sort=name|${sortType}`;
    }

    const response = await axios.get(url);
    runInAction(() => {
      globalStore.models = response.data.item;
      console.log('Models have been sorted');
    });
  } catch (error) {
    console.log(error);
  }
};

//Sort models by motortype ---

export const sortModelsByMotortype = async (sortType) => {
  let url = 'https://api.baasic.com/beta/myapp-test/resources/VehicleModel';

  const carId = localStorage.getItem('carId');

  try {
    if (carId === 'all') {
      url += `?searchQuery=WHERE motortype='${sortType}'`;
    } else {
      url += `?searchQuery=WHERE vehiclemakeid ='${carId}' AND motortype='${sortType}'`;
    }

    const response = await axios.get(url);

    runInAction(() => {
      globalStore.models = response.data.item;
      console.log('Models have been sorted');
    });
  } catch (error) {
    console.log(error);
  }
};
