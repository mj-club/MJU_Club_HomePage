import axios from "axios";

const URL = "http://localhost:3001/auth";

export function kakaoLogin() {
  // const URL =
  //   process.env.REACT_APP_NODE_ENV === "production"
  //     ? ""
  //     : "http://13.209.214.244:8080";
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      // .get(URL + "/auth/kakao")
      .get("/auth/kakao")
      .then(({ data }) => {
        dispatch({
          type: "SET_USER",
          payload: data,
        });
      })
      .then(() => {})
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function join(body) {
  return (dispatch) => {
    axios.post(URL + "/join", body).then((data) => {
      dispatch({
        type: "SET_USER_EMAIL",
        payload: data.email,
      }).catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
    });
  };
}

export function emailLogin(body) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post(URL + "/login", body)
      .then(({ data }) => {
        dispatch({
          type: "SET_USER",
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function emailCheck(email) {
  return (dispatch)=> {
    axios.get(URL + "/duplicate/"+email).then((data) => {
      dispatch({
        type: "SET_MESSAGE",
        payload : data,
      });
    }).catch((error) => {
      dispatch({
        type: "ERROR",
        payload: error,
      });
    });
  };
}

export function nameCheck(name){
  return (dispatch) => {
    axios.get(URL+"/findEmail"+name).then((data) =>{
      dispatch({
        type: "match_Name",
        payload: data,
      });
    }).catch((error) => {
      dispatch({
        type: "ERROR",
        payload: error,
      });
    });
  };
}

export function clearError() {
  return (dispatch) => {
    dispatch({ type: "CLEAR_ERROR" });
  };
}
