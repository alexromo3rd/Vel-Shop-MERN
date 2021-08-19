import React from 'react';
import ButtonInterface from '../../interfaces/button.interface';
import './Button.scss';

const Button = ({ label, styleName, handleClick }: ButtonInterface) => {
  const className = `button ${styleName}`;
  return (
    <h1>hi</h1>
    // <button type='button' className={className} onClick={handleClick}>
    //   {label}
    // </button>
  );
};

export default Button;
