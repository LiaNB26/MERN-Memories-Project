import { GOOGLE_AUTH, LOGOUT, LOGIN, SIGNUP } from '../types.js';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case GOOGLE_AUTH:
    case LOGIN:
    case SIGNUP:
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        authData: null,
      };
    default:
      return state;
  }
};

export default authReducer;
