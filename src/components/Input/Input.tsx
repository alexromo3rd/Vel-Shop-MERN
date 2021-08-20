import React from 'react';
import InputInterface from '../../interfaces/input.interface';
import './Input.scss';

const Input = ({
  name,
  label,
  type,
  placeholder,
  handleChange,
  value,
  className,
  required,
}: InputInterface) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className={`input ${className}`}
        required={required}
      />
    </>
  );
};

export default Input;
