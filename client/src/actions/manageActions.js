import axios from "axios";

const URL =
  process.env.NODE_ENV !== "production"
    ? "http://13.209.214.244:8080/"
    : "/";

export function getClubMemeber(clubID) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      // .get(URL + "/auth/kakao")
      .get(URL+"club/readMembers?clubId="+clubID)
      .then(({ data }) => {
        dispatch({
          type: "SET_CLUB_MEMBERS",
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

export function setClubMemeber(body) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      // .get(URL + "/auth/kakao")
      .post()
      .then(({ data }) => {
        dispatch({
          type: "SET_CLUB_MEMBERS",
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

export function getSchedule(clubName) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      // .get(URL + "/auth/kakao")
      .get(URL+"schedule/create?clubName="+clubName)
      .then(({ data }) => {
        dispatch({
          type: "SET_CLUB_SCHEDULE",
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


export function setSchedule(body) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      // .get(URL + "/auth/kakao")
      .post(URL+"schedule/create", body)
      .then(({ data }) => {
        dispatch({
          type: "SET_CLUB_SCHEDULE",
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
