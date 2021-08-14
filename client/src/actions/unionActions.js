import axios from "axios";

const URL = "http://localhost:3001/union";

export function getUnioniInfos() {
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
};