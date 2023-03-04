import './HomePage.css';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';

import globalStore from '../../common/stores/GlobalStore';

function HomePage() {
  useEffect(() => {
    globalStore.getCars();
    globalStore.resetStates();
  }, []);

  return (
    <div className="container">
      {globalStore.cars.map((car) => {
        return (
          <Link
            key={car.id}
            to={`/models/${car.id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              height: '150px',
            }}
          >
            <div className="models_card">
              <h4>{car.abbrv}</h4>

              <img className="logo_image" src={car.logo} alt="cars"></img>
            </div>
          </Link>
        );
      })}

      {globalStore.cars.length === 0 ? (
        <h4 className="loading">Loading..</h4>
      ) : (
        <>
          <Link
            to={`/models/${'all'}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              height: '150px',
            }}
          >
            <div className="models_card all_models_card">
              <h4>All Models</h4>
              <img
                className="logo_image"
                src="https://i.postimg.cc/6p7YByyN/Untitled-design-1.png"
                alt="cars"
              ></img>
            </div>
          </Link>
          <Link
            to={`/createCarBrand`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              height: '150px',
            }}
          >
            <div className="models_card all_models_card">
              <h4>Add new Brand</h4>
              <img
                className="logo_image"
                src="https://i.postimg.cc/d0jdFYmY/Untitled-design.png"
                alt="cars"
              ></img>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default observer(HomePage);
