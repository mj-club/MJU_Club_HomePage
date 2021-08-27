import { combineReducers } from 'redux';

import authReducer from './authReducer';
import clubReducer from './clubReducer';
import manageReducer from './manageReduecer';

const rootReducer = combineReducers({
  authReducer,
  clubReducer,
  manageReducer
});

export default rootReducer;