import {all} from 'redux-saga/effects';
import authSagas from './auth/sagas';
import configSagas from './config/sagas';
import internalUserSagas from './internalUser/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    configSagas(),
    internalUserSagas(),

  ]);
}