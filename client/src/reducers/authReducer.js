import produce from "immer";

const initialState = {
  user: null,
  loading: false,
  error: null,
  user_email: null, // 로그인한 user_email
  check_email_message: null, //joinForm에서 이메일 중복확인결과 메시지(ex_이미 있는 이메일입니다)
  check_ph_message: null, //joinForm에서 핸드폰 중복확인결과 메시지
  check_studentid_message: null, //joinForm에서 학번 중복확인결과 메시지
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
    case "SET_EMAIL_MESSAGE":
      state.check_email_message = action.payload;
      break;
    case "SET_STUDENTID_MESSAGE":
      state.check_studentid_message = action.payload;
      break;
    case "SET_PH_MESSAGE":
      state.check_ph_message = action.payload;
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
