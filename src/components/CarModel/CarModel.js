import React from 'react';
import './CarModel.css';
import { observer } from 'mobx-react-lite';

import globalStore from '../../common/stores/GlobalStore';

function CarModel() {
  const filteredModels = globalStore.filteredModels;

  return (
    <>
      <div className="car_model_container">
        {filteredModels.length > 0 ? (
          filteredModels.map((model) => {
            return (
              <div className="card" key={model.id}>
                <h4 className="model_header">{model.name}</h4>
                <img src={model.image} alt="car"></img>
                <p>Motortype: {model.motortype}</p>
                <p>Power: {model.horsepower} HP</p>
                <p>Price: {model.price} EUR</p>
              </div>
            );
          })
        ) : (
          <h2 className="no_models_header">No such models</h2>
        )}
      </div>
    </>
  );
}

export default observer(CarModel);
