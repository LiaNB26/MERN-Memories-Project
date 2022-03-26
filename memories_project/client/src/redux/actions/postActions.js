import axios from 'axios';

import {
  GET_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  SET_CURRENT_POST,
} from '../types.js';

//'http://localhost:5000'
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    const token = JSON.parse(localStorage.getItem('profile')).token;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getPosts = () => async (dispatch) => {
  try {
    const response = await API.get('/posts');
    const { data } = response;
    //console.log(data);

    dispatch({ type: GET_ALL_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const response = await API.post('/posts', newPost);
    const { data } = response;
    //console.log(data);

    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await API.patch(`/posts/${id}`, updatedPost);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await API.delete(`/posts/${id}`);
    //console.log(data.message);
    dispatch({ type: DELETE_POST, payload: { id } });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await API.patch(`/posts/${id}/likePost`);
    //console.log(data.message);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentPost = (currentPost) => (dispatch) => {
  try {
    dispatch({ type: SET_CURRENT_POST, payload: currentPost });
  } catch (error) {
    console.log(error);
  }
};
