import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import './AddCarModel.css';

import sidebarStore from '../../stores/SideBarStore';
import carControllerStore from '../../stores/carControllerStore';
import { createNewModel } from '../../common/services/carController';

function AddCarModel() {
  const { carId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewModel(carId);
  };

  return (
    <>
      {sidebarStore.showAddModel ? (
        <form className="card new_card" onSubmit={handleSubmit}>
          <span className="close_btn" onClick={sidebarStore.handleModal}>
            X
          </span>
          <h4>Add new Model</h4>

          <h4 className="model_name_label">Model name:</h4>
          <input
            type="name"
            id="name"
            name="name"
            onChange={(e) => (carControllerStore.modelName = e.target.value)}
          />
          <br></br>

          <h4>Model image url:</h4>
          <input
            type="input"
            id="image"
            name="image"
            onChange={(e) => (carControllerStore.image = e.target.value)}
          />
          <br></br>

          <h4>Motortype:</h4>
          <input
            type="motortype"
            id="motortype"
            name="motortype"
            onChange={(e) => (carControllerStore.motortype = e.target.value)}
          />
          <br></br>

          <h4>Horsepower:</h4>
          <input
            type="power"
            id="power"
            name="power"
            onChange={(e) => (carControllerStore.horsepower = e.target.value)}
          />
          <br></br>

          <h4>Price:</h4>
          <input
            type="price"
            id="price"
            name="price"
            onChange={(e) => (carControllerStore.price = e.target.value)}
          />
          <br></br>

          <input type="submit" value="Add" />
        </form>
      ) : (
        ''
      )}
    </>
  );
}

export default observer(AddCarModel);
