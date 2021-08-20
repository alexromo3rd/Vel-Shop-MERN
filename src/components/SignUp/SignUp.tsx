import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserInterface from '../../interfaces/user.interface';
import { createUser } from '../../redux/reducers/userReducer';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './SignUp.scss';

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hash: '',
    confirmHash: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (userInfo: UserInterface): any => {
    dispatch(createUser(userInfo));
  };

  return (
    <div id='signup'>
      <Input
        name={'firstName'}
        label={'First Name'}
        type='text'
        placeholder='John'
        handleChange={({ target }) =>
          setUserInfo((state) => ({ ...state, firstName: target.value }))
        }
        value={userInfo.firstName}
        className={''}
        required={true}
      />
      {/* <Button label='Submit' styleName='submit' handleClick={handleSubmit} /> */}
      <button onClick={() => handleSubmit(userInfo)}>Submit</button>
    </div>
  );
};

export default SignUp;
