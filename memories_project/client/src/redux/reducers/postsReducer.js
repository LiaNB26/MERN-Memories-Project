export default (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_POSTS':
      return state;
    case 'CREATE_POST':
      return state;
    default:
      return state;
  }
};
