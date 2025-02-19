import { takeLatest, put, call,select ,race, delay, take } from 'redux-saga/effects';
import { 
  tokenInternalRequest,
  tokenInternalSuccess,
  tokenInternalFailure,
  tokenIntenalRequestVerified,
  tokenIntenalVerified,
  tokenIntenalVerifiedFailure,
  tokenIntenalExpires,
  logoutInternal,
  tokenExternalRequest,
  tokenExternalSuccess,
  tokenExternalFailure,
  logoutExternal,
  loginCatRequest,
  loginCatSuccess,
  loginCatFailure,
  logoutCat
} from '@/store/slices/authSlice';
import { signIn, signOut } from '@/services/odoo.request';
import { showNotification } from '@/store/slices/uiSlice';
import createRequest from '@/services/api-secure-internal';
const { post } = createRequest();



function* handleLoginInternal(action) {
  try {
    const { deviceId, phoneNumber } = yield select((state) => state.device);
    const { data } = yield call(post, '/mobile/api/request-token-internal', {
      nik_nip : action.payload.nip_nik,
      phoneNumber : phoneNumber
    },{
      deviceId: deviceId
    });
    yield put(tokenInternalSuccess({
      ...data,
      nik_nip : action.payload.nik_nip
    }));
    const { expired } = yield race({
      expired: delay(4 * 60 * 1000), // 4 minutes
      verified: take(tokenIntenalVerified.type),
    });
    if (expired) {
      yield put(tokenIntenalExpires());
    }
   // yield put(showNotification({ message: 'Welcome back!',  type: 'success'}));
  } catch (error) {
    if (error) {
      yield put(tokenInternalFailure(error.message));
      yield put(showNotification({ 
        message: error ? error.message : 'An unknown error occurred', 
        type: 'error' 
      }));
    } else {
      yield put(tokenInternalFailure('An unknown error occurred'));
      yield put(showNotification({ 
        message: 'An unknown error occurred', 
        type: 'error' 
      }));
    }
  }
}

function* handleVerifikasiOtpInternal(action) {
  try {

    const { internalUser } = yield select((state) => state.auth);
    const { deviceId } = yield select((state) => state.device);
    const { data } = yield call(post, '/mobile/api/verifikasi-token-internal', {
      token: internalUser.otpToken,
      otp : action.payload.otp
    },{
      deviceId: deviceId
    });

    yield put(tokenIntenalVerified({
      jwtAccessToken : data.jwtAccessToken,
      user : data.user
    }));
    yield put(showNotification({ message: 'Welcome back!',  type: 'success'}));
  } catch (error) {
    if (error) {
      yield put(tokenIntenalVerifiedFailure(error.message));
      yield put(showNotification({ 
        message: error ? error.message : 'An unknown error occurred', 
        type: 'error' 
      }));
    } else {
      yield put(tokenIntenalVerifiedFailure('An unknown error occurred'));
      yield put(showNotification({ 
        message: 'An unknown error occurred', 
        type: 'error' 
      }));
    }
  }
}


function* handleLogoutInternal() {
  try {
    yield call(signOut);
    yield put(showNotification({ 
      message: 'Logged out successfully', 
      type: 'success' 
    }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(showNotification({ 
        message: error.message, 
        type: 'error' 
      }));
    } else {
      yield put(showNotification({ 
        message: 'An unknown error occurred', 
        type: 'error' 
      }));
    }
  }
}


function* handleLoginExternal(action) {
  try {
    const user = yield call(signIn, action.payload.email, action.payload.password);
    if (user.type !== 'internal') {
      throw new Error('Invalid credentials for internal user');
    }
    yield put(tokenExternalSuccess(user));
    yield put(showNotification({ 
      message: 'Welcome back!', 
      type: 'success' 
    }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(tokenExternalFailure(error.message));
      yield put(showNotification({ 
        message: error instanceof Error ? error.message : 'An unknown error occurred', 
        type: 'error' 
      }));
    } else {
      yield put(tokenExternalFailure('An unknown error occurred'));
      yield put(showNotification({ 
        message: 'An unknown error occurred', 
        type: 'error' 
      }));
    }
  }
}


function* handleLogoutExternal() {
  try {
    yield call(signOut);
    yield put(showNotification({ 
      message: 'Logged out successfully', 
      type: 'success' 
    }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(showNotification({ 
        message: error.message, 
        type: 'error' 
      }));
    } else {
      yield put(showNotification({ 
        message: 'An unknown error occurred', 
        type: 'error' 
      }));
    }
  }
}








export function* watchAuth() {
  yield takeLatest(tokenInternalRequest.type, handleLoginInternal);
  yield takeLatest(tokenExternalRequest.type, handleLoginExternal);
  yield takeLatest(logoutInternal.type, handleLogoutInternal);
  yield takeLatest(logoutExternal.type, handleLogoutExternal);
  yield takeLatest(tokenIntenalRequestVerified.type, handleVerifikasiOtpInternal);
}