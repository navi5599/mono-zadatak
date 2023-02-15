import './HomePage.css';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';

import globalStore from '../../common/stores/GlobalStore';
import sidebarStore from '../../stores/SideBarStore';

function HomePage() {
  //Use to reset states on 'go back' button
  const resetStates = () => {
    globalStore.setPage = 2;
    globalStore.lockAscOptions = false;
    globalStore.lockDescOptions = false;
    globalStore.showLoadButton = false;
    sidebarStore.lockAscPriceOptions = false;
    sidebarStore.lockDescPriceOptions = false;
  };

  useEffect(() => {
    globalStore.getCars();
    resetStates();
  }, []);

  return (
    <div className="container">
      {globalStore.cars.map((car) => {
        return (
          <Link
            key={car.id}
            to="/models"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              height: '150px',
            }}
          >
            <div
              className="models_card"
              onClick={() => localStorage.setItem('carId', car.id)}
            >
              <h4>{car.abbrv}</h4>

              <img className="logo_image" src={car.logo} alt="cars"></img>
            </div>
          </Link>
        );
      })}

      <div className="models_card">
        <h4>All Models</h4>
        <Link to="/models">
          <Button
            className="allmodels_btn"
            value={'All models'}
            onClickHandler={() => localStorage.setItem('carId', 'all')}
          />
        </Link>
      </div>
    </div>
  );
}

export default observer(HomePage);
