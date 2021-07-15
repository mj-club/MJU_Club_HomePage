import axios from 'axios';

const API_URL = "localhost?";


export function getPeers(symbol){
  const url = `${API_URL}/join`;
  return (dispatch) => {
    axios.get(url, {params: {
      test: test
    }}).then(({data}) => {
      dispatch({
        type: 'SET_SAMPLE',
        payload: data
      });
    }).catch((error) => {
      dispatch({
        type: 'ERROR',
        payload: error.response.data
      });
    })
  };
}