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
    console.log(error.message);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const response = await axios.post(url, newPost);
    const { data } = response;
    console.log(data);

    dispatch({ type: 'CREATE_POST', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
