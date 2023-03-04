import React from 'react';
import './AddCarPage.css';

function AddCarPage() {
  return (
    <div className="add_car_container">
      <img
        src="https://i.postimg.cc/fTD8rpJn/remove-bg.png"
        alt="car_background"
      ></img>
      <form className="add_car_form">
        <label>Brand full name:</label>
        <input type="name" id="name" name="name" />
        <br></br>

        <label>Brand abbreviation:</label>
        <input type="abbrv" id="abbrv" name="abbrv" />
        <br></br>

        <label>Description:</label>
        <input type="description" id="description" name="description" />
        <br></br>

        <label>Logo url:</label>
        <input type="logo" id="logo" name="logo" />
        <br></br>

        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default AddCarPage;
