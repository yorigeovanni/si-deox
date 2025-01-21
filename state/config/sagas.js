import { call, put, takeLatest, select } from 'redux-saga/effects';
import actions from './configSlice';
import createRequest from '@/core/api-secure';


const { post } = createRequest();



function* startRegisterDevice(action) {
    try {
        const { data } = yield call(post, '/mobile/api/register-device', {
            deviceId: action.payload.deviceId,
            phoneNumber : action.payload.phoneNumber,
            publicKey: action.payload.publicKey
        });
        yield put(actions.succesRegisterDevice({
            token: data.token,
            deviceId: action.payload.deviceId,
            phoneNumber: action.payload.phoneNumber,
            publicKey: action.payload.publicKey
        }));
    } catch (error) {
        console.log(error.response?.data?.message);
        yield put(actions.errorRegisterDevice(error.response?.data?.message || error.message));
    }
}



function* reloadOtp(action) {
    try {
        const { deviceId, phoneNumber, publicKey } = yield select((state) => state.config);
        const { data } = yield call(post, '/mobile/api/register-device', {
            deviceId: deviceId,
            phoneNumber : phoneNumber,
            publicKey: publicKey
        });
        yield put(actions.successReloadOtp(data));
    } catch (error) {
        console.log(error);
        yield put(actions.errorReloadOtp(error.response?.data?.message || error.message));
    }
}




function* verifikasiOtp(action) {
    try {
        const { tokenRegistrasi } = yield select((state) => state.config);
        const { data } = yield call(post, '/mobile/api/verifikasi-otp', {
            token: tokenRegistrasi,
            otp : action.payload.otp
        });
        yield put(actions.successVerifikasiOtp({
            jwtAccessToken : data.jwtAccessToken,
        }));
    } catch (error) {
        console.log(error);
        yield put(actions.errorVerifikasiOtp(error.response?.data?.message || error.message));
    }
}


function* watchConfig() {
    yield takeLatest(actions.startRegisterDevice.type, startRegisterDevice);
    yield takeLatest(actions.reloadOtp.type, reloadOtp);
    yield takeLatest(actions.verifikasiOtp.type, verifikasiOtp);
}



export default watchConfig;