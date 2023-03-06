import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { updateModel } from '../../common/services/carController';

function EditCarModel({ model, handleCancelEditClick }) {
  const { carId } = useParams();
  const [currentModel, setCurrentModel] = useState(model);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateModel(carId, currentModel.id, currentModel, handleCancelEditClick);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentModel((prevModel) => ({
      ...prevModel,
      [name]: value,
    }));
  };

  return (
    <form className="card new_card" onSubmit={handleSubmit}>
      <span className="close_btn" onClick={handleCancelEditClick}>
        X
      </span>
      <h4>Edit Model</h4>

      <h4 className="model_name_label">Model name:</h4>
      <input
        type="input"
        id="name"
        name="name"
        value={currentModel.name}
        onChange={handleInputChange}
      />
      <br></br>

      <h4>Model image url:</h4>
      <input
        type="input"
        id="image"
        name="image"
        value={currentModel.image}
        onChange={handleInputChange}
      />
      <br></br>

      <h4>Motortype:</h4>
      <input
        type="input"
        id="motortype"
        name="motortype"
        value={currentModel.motortype}
        onChange={handleInputChange}
      />
      <br></br>

      <h4>Horsepower:</h4>
      <input
        type="input"
        id="horsepower"
        name="horsepower"
        value={currentModel.horsepower}
        onChange={handleInputChange}
      />
      <br></br>

      <h4>Price:</h4>
      <input
        type="input"
        id="price"
        name="price"
        value={currentModel.price}
        onChange={handleInputChange}
      />
      <br></br>

      <input type="submit" value="Save" />
    </form>
  );
}

export default observer(EditCarModel);
