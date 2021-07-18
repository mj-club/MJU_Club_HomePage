import axios from 'axios';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'https://localhost:3001/auth' : 'https://api.velog.io/';

export function kakaoLogin(){
  return (dispatch) => {
    dispatch({type: 'LOADING'});
    axios.get('/kakao').then(({data}) => {
      dispatch({
        type: 'SET_USER',
        payload: data
      });
    }).then(() => {
      
    }).catch((error) => {
      dispatch({
        type: 'ERROR',
        payload: error.message
      });
    });
  };
}

export function clearError() {
  return (dispatch) => {
    dispatch({type: 'CLEAR_ERROR'});
  };
}