import UserInterface from '../../interfaces/user.interface';
import axios from 'axios';

const initialState = {
  user: {},
};

const CREATE_USER = 'CREATE_USER';

export const createUser = (userObj: UserInterface) => async (dispatch: any) => {
  const { data } = await axios.post('/api/register', userObj);

  dispatch({
    type: CREATE_USER,
    payload: data,
  });
};

export default function reducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
}
