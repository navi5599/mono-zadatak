import axios from 'axios';
import globalStore from '../stores/GlobalStore';

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
