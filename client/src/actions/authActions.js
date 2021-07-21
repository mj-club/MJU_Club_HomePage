import axios from 'axios';

const URL = 'http://13.209.214.244:8080';

export function kakaoLogin(){
  return (dispatch) => {
    dispatch({type: 'LOADING'});
    axios.get(URL+'/kakao').then(({data}) => {
      dispatch({
        type: 'SET_USER',
        payload: data
      });
    }).then(() => {
      
    }).catch((error) => {
      dispatch({
        type: 'ERROR',
        payload: error
      });
    });
  };
}

export function clearError() {
  return (dispatch) => {
    dispatch({type: 'CLEAR_ERROR'});
  };
}