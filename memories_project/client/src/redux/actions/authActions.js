import { AUTH, LOGOUT } from '../types.js';

export const login = (result, token) => async (dispatch) => {
  try {
    const data = { result, token };
    // console.log(data);

    localStorage.setItem('profile', JSON.stringify({ ...data }));
    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('profile');
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
