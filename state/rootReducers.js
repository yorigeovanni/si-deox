import { combineReducers } from 'redux';
import { authReducer } from './auth/authSlice';
import { globalOtpReducer } from './global-otp/configSlice';
import { aplikasiInternalReducer } from './aplikasiInternal/aplikasiInternalSlice';
import { internalUserReducer } from './internalUser/internalUserSlice';
import { externalUserReducer } from './externalUser/externalUserSlice';
import { applicationReducer } from './application/applicationSlice';
import { configReducer } from './config/configSlice';

export default combineReducers({

  application : applicationReducer,
  config : configReducer,
  auth : authReducer,
  globalOtp : globalOtpReducer,
  aplikasiInternal : aplikasiInternalReducer,
  internalUser : internalUserReducer,
  externalUser : externalUserReducer
});