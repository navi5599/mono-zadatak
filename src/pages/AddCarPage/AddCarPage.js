import React from 'react';
import { observer } from 'mobx-react-lite';
import './AddCarPage.css';

import carControllerStore from '../../stores/carControllerStore';
import { createNewBrand } from '../../common/services/carController';

function AddCarPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewBrand();
  };

  return (
    <div className="add_car_container">
      <img
        src="https://i.postimg.cc/fTD8rpJn/remove-bg.png"
        alt="car_background"
      ></img>
      <form className="add_car_form" onSubmit={handleSubmit}>
        <label>Brand full name:</label>
        <input
          type="name"
          id="name"
          name="name"
          onChange={(e) => (carControllerStore.name = e.target.value)}
        />
        <br></br>

        <label>Brand abbreviation:</label>
        <input
          type="abbrv"
          id="abbrv"
          name="abbrv"
          onChange={(e) => (carControllerStore.abbrv = e.target.value)}
        />
        <br></br>

        <label>Description:</label>
        <input
          type="description"
          id="description"
          name="description"
          onChange={(e) => (carControllerStore.description = e.target.value)}
        />
        <br></br>

        <label>Logo url:</label>
        <input
          type="logo"
          id="logo"
          name="logo"
          onChange={(e) => (carControllerStore.logo = e.target.value)}
        />
        <br></br>

        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default observer(AddCarPage);
