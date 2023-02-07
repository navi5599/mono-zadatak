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
      {globalStore.cars.map((car, id) => {
        return (
          <div className="models_card" key={id}>
            <h4>{car.abbrv}</h4>
            <Link to="/models">
              <button onClick={() => globalStore.getModels(car.id)}>
                show
              </button>
            </Link>
          </div>
        );
      })}

      <div className="allmodels_card">
        <h4>All Models</h4>
        <Link to="/models">
          <button onClick={() => globalStore.getModels('all')}>show</button>
        </Link>
      </div>
    </div>
  );
}

export default observer(HomePage);
