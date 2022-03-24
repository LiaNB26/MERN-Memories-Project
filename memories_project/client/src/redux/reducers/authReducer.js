import { AUTH, LOGOUT } from '../types.js';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      //   console.log(action.payload);
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
