import React from 'react';
import './CarModel.css';
import { observer } from 'mobx-react-lite';

import globalStore from '../../common/stores/GlobalStore';
import sidebarStore from '../../stores/SideBarStore';

function CarModel() {
  return (
    <div className="car_model_container">
      {globalStore.models
        .filter((car) => {
          return sidebarStore.searchedCar.toLowerCase() === ''
            ? car
            : car.name.toLowerCase().includes(sidebarStore.searchedCar);
        })
        .map((model) => {
          return (
            <div className="card" key={model.id}>
              <h4>{model.name}</h4>
              <img src={model.image} alt="car"></img>
              <p>Motortype: {model.motortype}</p>
              <p>Power: {model.horsepower} HP</p>
              <p>Price: {model.price} EUR</p>
            </div>
          );
        })}
    </div>
  );
}

export default observer(CarModel);