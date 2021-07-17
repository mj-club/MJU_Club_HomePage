import produce from 'immer';

const initialState = {
  sample: null
};


const reducer = produce((state, action) => {
  console.log(action);
  switch(action.type) {
    case 'SET_SAMPLE':
      state.sample = action.payload;
      break;
    default:
      break;
  }
}, initialState);

export default reducer;