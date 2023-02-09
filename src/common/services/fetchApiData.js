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

  if (id !== 'all') {
    modelsUrl += `?searchQuery=WHERE vehiclemakeid = '${id}'`;
  }

  axios
    .get(modelsUrl)
    .then((res) => {
      globalStore.models = res.data.item;
      console.log('NOVADATA');
      console.log(res.data.item);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Try this to fetch new models ---

// export const getNewModelsData = () => {
//   const currentModels = globalStore.models;
//   const page = 1;

//   if (currentModels.length <= 25) {
//     axios
//       .get(
//         `https://api.baasic.com/beta/myapp-test/resources/VehicleMake?page=${
//           page + 1
//         }`
//       )
//       .then((res) => {
//         globalStore.models = [...currentModels, ...res.data.item];
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// };
