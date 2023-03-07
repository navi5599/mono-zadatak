import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './CarModelsPage.css';

import globalStore from '../../common/stores/GlobalStore';

import SideBar from '../../layouts/SideBar/SideBar';
import CarModel from '../../components/CarModel/CarModel';
import Button from '../../components/Button/Button';

function CarModelsPage() {
  //Use car id from the local storage that we set on click from the home page
  const { carId } = useParams();

  useEffect(() => {
    globalStore.getModels(carId);
  }, [carId]);

  return (
    <div className="card_models_container">
      <SideBar />

      {globalStore.showLoadButton ? (
        <Button
          value="Load more"
          className="new_btn"
          onClickHandler={() => globalStore.getNewModels(carId)}
        />
      ) : (
        ''
      )}

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          value="Go back"
          className="go_back_button"
          onClickHandler={() => ''}
        />
      </Link>

      <CarModel />
    </div>
  );
}

export default observer(CarModelsPage);
