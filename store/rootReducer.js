import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import uiReducer from '@/store/slices/uiSlice';
import appReducer from '@/store/slices/appSlice';
import deviceReducer from '@/store/slices/deviceSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  app: appReducer,
  device : deviceReducer
});

export default rootReducer;