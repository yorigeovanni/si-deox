import { call, put, takeLatest, select } from 'redux-saga/effects';
import actions from './externalUserSlice';
import createRequest from '@/core/api-secure-external';
const { post } = createRequest();



function* requestToken(action) {
    try {
        const { deviceId, phoneNumber } = yield select((state) => state.config);
        const { data } = yield call(post, '/mobile/api/request-token-external', {
            nik_nip : action.payload.nik_nip,
            phoneNumber : phoneNumber
        },{
            deviceId: deviceId,
        });
        yield put(actions.successRequestToken({
            ...data,
            nik_nip : action.payload.nik_nip
        }));
    } catch (error) {
        console.log(error);
        yield put(actions.errorRequestToken(error.response?.data?.message || error.message));
    }
}



function* reloadOtp(action) {
    try {
        const { deviceId, phoneNumber } = yield select((state) => state.config);
        const { nik_nip } = yield select((state) => state.externalUser);
        const { data } = yield call(post, '/mobile/api/request-token-external', {
            nik_nip : nik_nip,
            phoneNumber : phoneNumber,
        },{
            deviceId: deviceId,
        });
        yield put(actions.successReloadOtp(data));
    } catch (error) {
        console.log(error);
        yield put(actions.errorReloadOtp(error.response?.data?.message || error.message));
    }
}



function* verifikasiOtp(action) {
    try {
        const { tokenLogin } = yield select((state) => state.externalUser);
        const { deviceId } = yield select((state) => state.config);
        const { data } = yield call(post, '/mobile/api/verifikasi-token-external', {
            token: tokenLogin,
            otp : action.payload.otp
        },{
            deviceId: deviceId,
        });
        yield put(actions.successVerifikasiOtp({
            jwtAccessToken : data.jwtAccessToken,
            user : data.user
        }));
    } catch (error) {
        console.log(error);
        yield put(actions.errorVerifikasiOtp(error.response?.data?.message || error.message));
    }
}




function* watchConfig() {
    yield takeLatest(actions.requestToken.type, requestToken);
    yield takeLatest(actions.reloadOtp.type, reloadOtp);
    yield takeLatest(actions.verifikasiOtp.type, verifikasiOtp);
}



export default watchConfig;