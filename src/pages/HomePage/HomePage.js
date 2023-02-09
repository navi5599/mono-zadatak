import './HomePage.css';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import globalStore from '../../common/stores/GlobalStore';

function HomePage() {
  useEffect(() => {
    globalStore.getCars();
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
              onClick={() => globalStore.getModels(car.id)}
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
          <button
            className="allmodels_button"
            onClick={() => globalStore.getModels('all')}
          >
            All models
          </button>
        </Link>
      </div>
    </div>
  );
}

export default observer(HomePage);
