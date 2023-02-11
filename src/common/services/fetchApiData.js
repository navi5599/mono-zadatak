import axios from 'axios';
import globalStore from '../stores/GlobalStore';

//get all cars from api service and save it to the cars array in store
export const getCarsData = () => {
  axios
    .get('https://api.baasic.com/beta/myapp-test/resources/VehicleMake')
    .then((res) => {
      globalStore.cars = res.data.item;
      console.log(res.data.item);
    })
    .catch((err) => {
      console.log(err);
    });
};

//get all car models from api service and save it to the models array in store

export const getModelsData = (id) => {
  let modelsUrl =
    'https://api.baasic.com/beta/myapp-test/resources/VehicleModel';
  console.log(globalStore.showLoadButton);
  console.log(id);
  if (id === 'all') {
    modelsUrl = 'https://api.baasic.com/beta/myapp-test/resources/VehicleModel';
    //Show the load more button, because we got more than 5 models to show
    globalStore.showLoadButton = true;
    console.log(globalStore.showLoadButton);
  } else {
    modelsUrl += `?searchQuery=WHERE vehiclemakeid = '${id}'`;
    globalStore.showLoadButton = false;
  }

  axios
    .get(modelsUrl)
    .then((res) => {
      globalStore.models = res.data.item;
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch new models ---

export const getNewModelsData = () => {
  const currentModels = globalStore.models;

  if (currentModels.length < 25) {
    axios
      .get(
        `https://api.baasic.com/beta/myapp-test/resources/VehicleModel?page=${globalStore.setPage}`
      )
      .then((res) => {
        globalStore.models = [...currentModels, ...res.data.item];
        console.log('New models added');
        console.log(globalStore.models);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  globalStore.setPage++;
};
