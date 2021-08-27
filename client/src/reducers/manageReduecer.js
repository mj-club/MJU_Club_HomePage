import produce from "immer";

const initialState = {
  loading: false,
  error: null,
  club_members: null,
  club_schedules: null,
};

const authReducer = produce((state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_CLUB_MEMBERS":
      state.loading = false;
      state.club_members = action.payload;
      state.error = null;
      break;
    case "SET_CLUB_SCHEDULE":
      state.loading = false;
      state.club_schedules = action.payload;
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
    default:
      break;
  }
}, initialState);

export default authReducer;
