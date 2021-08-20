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

  const handleSubmit = (userInfo: any): any => {
    if (userInfo.hash === userInfo.confirmHash) {
      dispatch(createUser(userInfo));
    }
  };

  return (
    <div id='signup'>
      <form action='submit' onSubmit={() => handleSubmit}>
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
        <Input
          name={'lastName'}
          label={'Last Name'}
          type='text'
          placeholder='Smith'
          handleChange={({ target }) =>
            setUserInfo((state) => ({ ...state, lastName: target.value }))
          }
          value={userInfo.lastName}
          className={''}
          required={true}
        />
        <Input
          name={'email'}
          label={'Email'}
          type='text'
          placeholder='John@email.com'
          handleChange={({ target }) =>
            setUserInfo((state) => ({
              ...state,
              email: target.value.toLowerCase(),
            }))
          }
          value={userInfo.email}
          className={''}
          required={true}
        />
        <Input
          name={'hash'}
          label={'Password'}
          type='password'
          placeholder='password'
          handleChange={({ target }) =>
            setUserInfo((state) => ({ ...state, hash: target.value }))
          }
          value={userInfo.hash}
          className={''}
          required={true}
        />
        <Input
          name={'confirmHash'}
          label={'Confirm Password'}
          type='password'
          placeholder='confirm password'
          handleChange={({ target }) =>
            setUserInfo((state) => ({ ...state, confirmHash: target.value }))
          }
          value={userInfo.confirmHash}
          className={''}
          required={true}
        />
        {/* <Button label='Submit' styleName='submit' handleClick={handleSubmit} /> */}
        <button onClick={() => handleSubmit(userInfo)}>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
