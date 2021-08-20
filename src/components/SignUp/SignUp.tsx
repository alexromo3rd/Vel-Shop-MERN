import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInterface from '../../interfaces/user.interface';
import { createUser } from '../../redux/reducers/userReducer';
import Button from '../Button/Button';
import './SignUp.scss';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userObj: UserInterface = {
    firstName: 'Alex',
    lastName: 'Romo',
    email: 'ayromo08@gmail.com',
    hash: 'password',
  };

  const handleSubmit = (userObj: UserInterface): any => {
    dispatch(createUser(userObj));
  };

  return (
    <div id='signup'>
      {/* <Button label='Submit' styleName='submit' handleClick={handleSubmit} /> */}
      <button onClick={() => handleSubmit(userObj)}>Submit</button>
    </div>
  );
};

export default SignUp;
