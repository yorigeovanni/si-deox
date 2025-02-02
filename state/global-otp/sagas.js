import { call, put, takeLatest, select } from 'redux-saga/effects';
import actions from './configSlice';
import createRequest from '@/core/api-secure-portal';
const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';
const { post } = createRequest();


function timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => reject(new Error("Request timeout")), ms);
        promise
            .then((res) => {
                clearTimeout(timeoutId);
                resolve(res);
            })
            .catch((err) => {
                clearTimeout(timeoutId);
                reject(err);
            });
    });
}

function* startRegisterDevice(action) {
    try {
        const response = yield call(() =>
            timeoutPromise(5000, fetch(`${baseURL}/mobile/api/public-register-device`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    realDeviceId: action.payload.deviceId,
                    deviceId: action.payload.fakeDeviceID,
                    phoneNumber: action.payload.phoneNumber,
                    publicKey: action.payload.publicKey,
                    deviceInfo: action.payload.deviceInfo,
                }),
            }))
        );
        const data = yield call([response, response.json]);
        yield put(
            actions.succesRegisterDevice({
                token: data.token,
                deviceId: action.payload.fakeDeviceID,
                phoneNumber: action.payload.phoneNumber,
            })
        );
    } catch (error) {
        console.error(error);
        yield put(actions.errorRegisterDevice(error.message));
    }
}




/*
function* reloadOtp() {
    try {
        const { deviceId, phoneNumber } = yield select((state) => state.globalOtp);
        const { data } = yield call(post, '/mobile/api/public-reload-register-device', {
            deviceId: deviceId,
            phoneNumber : phoneNumber
        });
        yield put(actions.successReloadOtp(data));
    } catch (error) {
        console.log(error);
        yield put(actions.errorReloadOtp(error.response?.data?.message || error.message));
    }
}
*/

function* verifikasiOtp(action) {
    try {
        const { tokenRegistrasi } = yield select((state) => state.globalOtp);
        const { data } = yield call(post, '/mobile/api/public-verifikasi-otp', {
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
   // yield takeLatest(actions.reloadOtp.type, reloadOtp);
    yield takeLatest(actions.verifikasiOtp.type, verifikasiOtp);
}



export default watchConfig;