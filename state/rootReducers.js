import { combineReducers } from 'redux';
import { authReducer } from './auth/authSlice';
import { configReducer } from './global-otp/configSlice';
import { aplikasiInternalReducer } from './aplikasiInternal/aplikasiInternalSlice';
import { internalUserReducer } from './internalUser/internalUserSlice';
import { externalUserReducer } from './externalUser/externalUserSlice';

export default combineReducers({
  auth : authReducer,
  config : configReducer,
  aplikasiInternal : aplikasiInternalReducer,
  internalUser : internalUserReducer,
  externalUser : externalUserReducer
});