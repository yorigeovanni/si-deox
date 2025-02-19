import { all } from 'redux-saga/effects';
import { watchAuth } from '@/store/sagas/authSaga';
import { watchApp } from '@/store/sagas/appSaga';
import { watchDevice } from '@/store/sagas/deviceSaga';

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchApp(),
    watchDevice(),
  ]);
}