import React, { useState } from 'react';
import './CarModel.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import globalStore from '../../common/stores/GlobalStore';
import Button from '../Button/Button';
import AddCarModel from '../AddCarModel/AddCarModel';
import EditCarModel from '../EditCarModel/EditCarModel';

import { deleteModel } from '../../common/services/carController';

function CarModel() {
  const filteredModels = globalStore.filteredModels;

  const { carId } = useParams();

  const [editingModel, setEditingModel] = useState(null);

  const handleEditClick = (model) => {
    setEditingModel(model);
  };

  const handleCancelEditClick = () => {
    setEditingModel(null);
  };

  return (
    <>
      <div className="car_model_container">
        <AddCarModel />

        {filteredModels.length > 0 ? (
          filteredModels.map((model) => {
            return (
              <div key={model.id}>
                {editingModel && editingModel.id === model.id ? (
                  <EditCarModel
                    model={model}
                    handleCancelEditClick={handleCancelEditClick}
                    setEditingModel={setEditingModel}
                  />
                ) : (
                  <div className="card" key={model.id}>
                    <h4 className="model_header">{model.name}</h4>
                    <img
                      src={
                        model.image === ''
                          ? 'https://i.postimg.cc/fTD8rpJn/remove-bg.png'
                          : model.image
                      }
                      alt="car"
                    ></img>

                    <div className="card_footer">
                      <div className="card_info">
                        <p>
                          <span>Motortype</span>: {model.motortype}
                        </p>
                        <p>
                          <span>Power</span>: {model.horsepower} HP
                        </p>
                        <p>
                          <span>Price</span>: {model.price} EUR
                        </p>
                      </div>
                      <div className="card_options">
                        <Button
                          value={'Edit'}
                          className={''}
                          onClickHandler={() => handleEditClick(model)}
                        />
                        <Button
                          value={'Delete'}
                          className={'red_btn'}
                          onClickHandler={() => deleteModel(carId, model.id)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h2 className="no_models_header">
            There are no any models found for this Car brand.
          </h2>
        )}
      </div>
    </>
  );
}

export default observer(CarModel);

// import React, { useState } from 'react';
// import './CarModel.css';
// import { observer } from 'mobx-react-lite';
// import { useParams } from 'react-router-dom';

// import globalStore from '../../common/stores/GlobalStore';
// import Button from '../Button/Button';
// import AddCarModel from '../AddCarModel/AddCarModel';

// import { deleteModel } from '../../common/services/carController';

// function CarModel() {
//   const filteredModels = globalStore.filteredModels;

//   const { carId } = useParams();

//   return (
//     <>
//       <div className="car_model_container">
//         <AddCarModel />

//         {filteredModels.length > 0 ? (
//           filteredModels.map((model, index) => {
//             return (
//               <div className="card" key={model.id}>
//                 <h4 className="model_header">{model.name}</h4>
//                 <img
//                   src={
//                     model.image === ''
//                       ? 'https://i.postimg.cc/fTD8rpJn/remove-bg.png'
//                       : model.image
//                   }
//                   alt="car"
//                 ></img>

//                 <div className="card_footer">
//                   <div className="card_info">
//                     <p>
//                       <span>Motortype</span>: {model.motortype}
//                     </p>
//                     <p>
//                       <span>Power</span>: {model.horsepower} HP
//                     </p>
//                     <p>
//                       <span>Price</span>: {model.price} EUR
//                     </p>
//                   </div>
//                   <div className="card_options">
//                     <Button value={'Edit'} />
//                     <Button
//                       value={'Delete'}
//                       className={'red_btn'}
//                       onClickHandler={() => deleteModel(carId, model.id)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <h2 className="no_models_header">
//             There are no any models found for this Car brand
//           </h2>
//         )}
//       </div>
//     </>
//   );
// }

// export default observer(CarModel);
