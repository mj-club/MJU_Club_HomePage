import axios from "axios";

const URL =
  process.env.NODE_ENV !== "production"
    ? "http://13.209.214.244:8080/auth"
    : "/auth";


export function getUnionInfos() {
  return (dispatch) => {
    axios.get(URL + "/read")
    .then((data) => {
      dispatch({
        type: "SET_UNION_INFOS",
        payload: data
      })
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        palyload: error
      })
    });
  };
}