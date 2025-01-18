import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './authSlice';
import createRequest from '@/core/api';
const { post } = createRequest();



function* loginInternal(action) {
    try {
        const { data } = yield call(post, '/mobile/api/internal/login', action.payload);
        yield put(actions.loginInternalSuccess(data));
    } catch (error) {
        console.log(error.response?.data?.message);
        yield put(actions.loginInternalFailed(error.response?.data?.message || error.message));
    }
}




function* watchAuth() {
    yield takeLatest(actions.loginInternal.type, loginInternal);
}



export default watchAuth;