import {all} from 'redux-saga/effects';
import authSagas from './auth/sagas';
import registerDeviceSagas from './config/sagas';


export default function* rootSaga() {
  yield all([
    authSagas(),
    registerDeviceSagas(),
  //  configSagas(),
  //  homeSagas(),
  //  withlistSagas(),
  //  productSagas(),
  //  listSagas(),
  //  messageSagas(),
  //  notificationSagas(),
  ]);
}