import { combineReducers } from 'redux';
import { authReducer } from './auth/authSlice';
import { configReducer } from './config/configSlice';
import { aplikasiInternalReducer } from './aplikasiInternal/aplikasiInternalSlice';
import { internalUserReducer } from './internalUser/internalUserSlice';

export default combineReducers({
  auth : authReducer,
  config : configReducer,
  aplikasiInternal : aplikasiInternalReducer,
  internalUser : internalUserReducer,
});