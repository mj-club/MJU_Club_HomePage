import produce from "immer";

const initialState = {
  error = null,
  union_infos = null,
};

const unionReducer = produce((state, action) => {
  console.log(action);
  switch(action.type){
    case "ERROR" :
      state.error = action.payload;
      break;
    case "SET_UNION_INFOS":
      state.union_infos = action.payload;
  }
}, initialState);

export default unionReducer;