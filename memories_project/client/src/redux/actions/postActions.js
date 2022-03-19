//import * as api from '../../api/api.js';
import axios from 'axios';

// Action creators

const url = 'http://localhost:5000/posts';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(url);
    const { data } = response;
    //console.log(data);

    dispatch({ type: 'GET_ALL_POSTS', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const response = await axios.post(url, newPost);
    const { data } = response;
    console.log(data);

    dispatch({ type: 'CREATE_POST', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${url}/${id}`, updatedPost);
    dispatch({ type: 'UPDATE_POST', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${url}/${id}`);
    //console.log(data.message);
    dispatch({ type: 'DELETE_POST', payload: { id } });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentPost = (currentPost) => (dispatch) => {
  try {
    dispatch({ type: 'SET_CURRENT_POST', payload: currentPost });
  } catch (error) {
    console.log(error);
  }
};
