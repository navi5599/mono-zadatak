import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CarModelsPage.css';

import globalStore from '../../common/stores/GlobalStore';

import SideBar from '../../layouts/SideBar/SideBar';
import CarModel from '../../components/CarModel/CarModel';
import Button from '../../components/Button/Button';

function CarModelsPage() {
  //Use car id from the local storage that we set on click from the home page
  const carId = localStorage.getItem('carId');

  useEffect(() => {
    globalStore.getModels(carId);
  }, [carId]);

  return (
    <div className="card_models_container">
      <SideBar />
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          value="Go back"
          className="centered_button"
          onClickHandler={() => ''}
        />
      </Link>

      <CarModel />
    </div>
  );
}

export default CarModelsPage;
