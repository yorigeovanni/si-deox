import {all} from 'redux-saga/effects';
import authSagas from './auth/sagas';
import configSagas from './global-otp/sagas';
import internalUserSagas from './internalUser/sagas';
import externalUserSagas from './externalUser/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    configSagas(),
    internalUserSagas(),
    externalUserSagas(),

  ]);
}