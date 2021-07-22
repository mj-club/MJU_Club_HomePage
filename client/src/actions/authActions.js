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

export function join() {
  return (dispatch) => {
    axios.post(URL + "/join")
    .then( (data) => {
      dispatch({
        type : "SHOW_MESSAGE",
        payload : data //무슨데이터가 들어오지?
      })
      .catch( (error) => {
        dispatch({
          type: "ERROR",
          payload: error
        })
      });
    });
  };
};

export function clearError() {
  return (dispatch) => {
    dispatch({type: 'CLEAR_ERROR'});
  };
}