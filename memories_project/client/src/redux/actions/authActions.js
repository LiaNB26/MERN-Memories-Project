import axios from 'axios';

import { GOOGLE_AUTH, LOGIN, LOGOUT, SIGNUP } from '../types.js';
// const url = 'http://localhost:5000/user';
const API = axios.create({ baseURL: 'http://localhost:5000/user' });

export const googleLogin = (result, token) => async (dispatch) => {
  try {
    const data = { result, token };
    // console.log(data);

    //localStorage.setItem('profile', JSON.stringify({ ...data }));
    dispatch({ type: GOOGLE_AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.post('/signin', formData);

    dispatch({ type: LOGIN, payload: data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.post('/signup', formData);

    dispatch({ type: SIGNUP, payload: data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
