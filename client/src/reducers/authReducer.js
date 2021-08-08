import produce from "immer";

const initialState = {
  user: null,
  loading: false,
  error: null,
  user_email: null,
  message: null,
  find_email: null
};

const authReducer = produce((state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      break;
    case "LOADING":
      state.loading = true;
      break;
    case "ERROR":
      state.loading = false;
      state.error = action.payload;
      break;
    case "CLEAR_ERROR":
      state.error = null;
      break;

    case "SET_USER_EMAIL":
      state.user_email = action.payload;
      break;
    case "SET_MESSAGE":
      state.message = action.payload;
      break;
    case "FIND_EMAIL":
      state.loading = false;
      state.find_email = action.payload;
      state.error = null;
      break;
      
    case "FIND_PASSWORD":
      state.loading = false;
      state.find_password = action.payload;
      state.error = null;
      break;
      
    default:
      break;
  }
}, initialState);

export default authReducer;
