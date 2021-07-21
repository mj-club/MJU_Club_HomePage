import axios from 'axios';

const URL = 'http://localhost:3001/auth';

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

export function emailLogin(body){
  return (dispatch) => {
    dispatch({type: 'LOADING'});
    axios.post(URL+'/login', body).then(({data}) => {
      dispatch({
        type: 'SET_USER',
        payload: data
      });
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