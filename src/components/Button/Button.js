import React from 'react';
import './Button.css';

function Button({ value, className, onClickHandler }) {
  return (
    <button className={`btn ${className}`} onClick={() => onClickHandler()}>
      {value}
    </button>
  );
}

export default Button;
