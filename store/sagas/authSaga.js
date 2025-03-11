import {
  takeLatest,
  put,
  call,
  select,
  race,
  delay,
  take,
} from "redux-saga/effects";
import {
  // INTERNAL REQUEST LOGIN
  tokenInternalRequest,
  tokenInternalSuccess,
  tokenInternalFailure,
  tokenIntenalRequestVerified,
  tokenIntenalVerified,
  tokenIntenalVerifiedFailure,
  tokenIntenalExpires,

  //EXTERNAL REQUEST LOGIN


  logoutInternal,
  tokenExternalRequest,
  tokenExternalSuccess,
  tokenExternalFailure,
  tokenExternalRequestVerified,
  tokenExternalVerified,
  tokenExternalVerifiedFailure,
  tokenExternalExpires,

} from "@/store/slices/authSlice";


import { showNotification } from "@/store/slices/uiSlice";
import createRequest from "@/services/api-secure-portal";
const { post } = createRequest();




function* handleLoginInternal(action) {
  try {
    const { deviceId, phoneNumber } = yield select((state) => state.device);
    const { data } = yield call(
      post,
      "/mobile/api/portal/request-token-internal",
      {
        nik_nip: action.payload.nip_nik
      },
      {
        deviceId: deviceId,
      });
    yield put(tokenInternalSuccess({
      ...data,
      nik_nip : action.payload.nik_nip
    }));
    const { expired } = yield race({
      expired: delay(3 * 60 * 1000), // 4 minutes
      verified: take(tokenIntenalVerified.type)
    });
    if (expired) {
      yield put(tokenIntenalExpires());
    }
  } catch (error) {
    if (error) {
      yield put(tokenInternalFailure(error.message));
      yield put(
        showNotification({
          message: error ? error.message : "An unknown error occurred",
          type: "error",
        })
      );
    } else {
      yield put(tokenInternalFailure("An unknown error occurred"));
      yield put(
        showNotification({
          message: "An unknown error occurred",
          type: "error",
        })
      );
    }
  }
}





function* handleVerifikasiOtpInternal(action) {
  try {
    const { internalUser } = yield select((state) => state.auth);
    const { deviceId } = yield select((state) => state.device);
    const { data } = yield call( post, "/mobile/api/portal/verifikasi-token-internal",
      {
        token: internalUser.otpToken,
        otp: action.payload.otp,
      },
      {
        deviceId: deviceId,
      }
    );
    yield put(tokenIntenalVerified({
      jwtAccessToken : data.jwtAccessToken,
      user : data.user
    }));
  } catch (error) {
    if (error) {
      yield put(tokenIntenalVerifiedFailure(error.message));
      yield put(
        showNotification({
          message: error ? error.message : "An unknown error occurred",
          type: "error",
        })
      );
    } else {
      yield put(tokenIntenalVerifiedFailure("An unknown error occurred"));
      yield put(
        showNotification({
          message: "An unknown error occurred",
          type: "error",
        })
      );
    }
  }
}





function* handleLoginExternal(action) {
  try {
    const { deviceId } = yield select((state) => state.device);
    const { data } = yield call(post, "/mobile/api/portal/request-token-external",
      {
        mitra_code: action.payload.nip_nik
      },
      {
        deviceId: deviceId,
      });
    yield put(tokenExternalSuccess({
      ...data,
      nik_nip : action.payload.nik_nip
    }));


    const { expired } = yield race({
      expired: delay(3 * 60 * 1000), // 4 minutes
      verified: take(tokenExternalVerified.type)
    });
    if (expired) {
      yield put(tokenExternalExpires());
    }
  } catch (error) {
    if (error) {
      yield put(tokenExternalFailure(error.message));
      yield put(
        showNotification({
          message: error ? error.message : "An unknown error occurred",
          type: "error",
        })
      );
    } else {
      yield put(tokenExternalFailure("An unknown error occurred"));
      yield put(
        showNotification({
          message: "An unknown error occurred",
          type: "error",
        })
      );
    }
  }
}



function* handleVerifikasiOtpExternal(action) {
  try {
    const { externalUser } = yield select((state) => state.auth);
    const { deviceId } = yield select((state) => state.device);
    console.log('=====================================')
    console.log(externalUser)
    console.log('=====================================')
    const { data } = yield call( post, "/mobile/api/portal/verifikasi-token-external",
      {
        token: externalUser.otpToken,
        otp: action.payload.otp,
      },
      {
        deviceId: deviceId,
      }
    );
    yield put(tokenExternalVerified({
      jwtAccessToken : data.jwtAccessToken,
      user : data.user
    }));
  } catch (error) {
    if (error) {
      yield put(tokenExternalVerifiedFailure(error.message));
      yield put(
        showNotification({
          message: error ? error.message : "An unknown error occurred",
          type: "error",
        })
      );
    } else {
      yield put(tokenExternalVerifiedFailure("An unknown error occurred"));
      yield put(
        showNotification({
          message: "An unknown error occurred",
          type: "error",
        })
      );
    }
  }
}






/*
function* handleLogoutInternal() {
  try {
    yield call(signOut);
    yield put(
      showNotification({
        message: "Logged out successfully",
        type: "success",
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        showNotification({
          message: error.message,
          type: "error",
        })
      );
    } else {
      yield put(
        showNotification({
          message: "An unknown error occurred",
          type: "error",
        })
      );
    }
  }
}
*/

/*
function* handleLoginExternal(action) {
  try {
    const user = yield call(
      signIn,
      action.payload.email,
      action.payload.password
    );
    if (user.type !== "internal") {
      throw new Error("Invalid credentials for internal user");
    }
    yield put(tokenExternalSuccess(user));
    yield put(
      showNotification({
        message: "Welcome back!",
        type: "success",
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(tokenExternalFailure(error.message));
      yield put(
        showNotification({
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
          type: "error",
        })
      );
    } else {
      yield put(tokenExternalFailure("An unknown error occurred"));
      yield put(
        showNotification({
          message: "An unknown error occurred",
          type: "error",
        })
      );
    }
  }
}

function* handleLogoutExternal() {
  try {
    yield call(signOut);
    yield put(
      showNotification({
        message: "Logged out successfully",
        type: "success",
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        showNotification({
          message: error.message,
          type: "error",
        })
      );
    } else {
      yield put(
        showNotification({
          message: "An unknown error occurred",
          type: "error",
        })
      );
    }
  }
}
*/
export function* watchAuth() {
  yield takeLatest(tokenInternalRequest.type, handleLoginInternal);
  yield takeLatest( tokenIntenalRequestVerified.type, handleVerifikasiOtpInternal);

  yield takeLatest(tokenExternalRequest.type, handleLoginExternal);
  yield takeLatest( tokenExternalRequestVerified.type, handleVerifikasiOtpExternal);


  
  //yield takeLatest(logoutInternal.type, handleLogoutInternal);
  //yield takeLatest(tokenExternalRequest.type, handleLoginExternal);
 // yield takeLatest(logoutExternal.type, handleLogoutExternal);
  
}
