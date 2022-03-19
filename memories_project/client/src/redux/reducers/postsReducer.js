import Posts from '../../components/Posts/Posts';

export default (state = { posts: [], currentPost: null }, action) => {
  switch (action.type) {
    case 'GET_ALL_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    case 'CREATE_POST':
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case 'UPDATE_POST':
    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.id),
      };
    case 'SET_CURRENT_POST':
      return {
        ...state,
        currentPost: action.payload,
      };
    default:
      return state;
  }
};
