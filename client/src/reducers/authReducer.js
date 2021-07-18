import produce from 'immer';

const initialState = {
  user: null,
  loading: false,
  error: null
};


const authReducer = produce((state, action) => {
  console.log(action);
  switch(action.type) {
    case 'SET_USER':
      state.loading = false;
      state.user = action.payload;
      break;
    case 'LOADING':
      state.loading = true;
      break;
    case 'ERROR':
      state.loading = false;
      state.error = action.payload;
      break;
    case 'CLEAR_ERROR':
      state.error = null;
      break;
    default:
      break;
  }
}, initialState);

export default authReducer;