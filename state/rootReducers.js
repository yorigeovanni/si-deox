import { combineReducers } from 'redux';
import { authReducer } from './auth/authSlice';
import { configReducer } from './config/configSlice';


export default combineReducers({
  auth : authReducer,
  config : configReducer
});