import {
  call,
  put,
  takeLatest,
  select,
  race,
  delay,
  take,
} from "redux-saga/effects";
import { Platform } from "react-native";
import { RSAKeychain } from "react-native-rsa-native";
import * as Device from "expo-device";
import * as Application from "expo-application";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";
import createRequest from "@/services/api-secure-portal";
import {
  startDeviceRegistration,
  deviceRegistrationSuccess,
  deviceRegistrationFailure,
  verifyOtp,
  verifyOtpSuccess,
  verifyOtpFailure,
  registrationTimeExpired,
  checkLockStatus,
} from "@/store/slices/deviceSlice";

const { post } = createRequest();
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;




function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(
      () => reject(new Error("Request timeout")),
      ms
    );
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




function* handleDeviceRegistration(action) {
  try {
    let osId = null;
    if (Platform.OS === "android") {
      osId = Application.getAndroidId();
    } else if (Platform.OS === "ios") {
      osId = yield call(Application.getIosIdForVendorAsync);
    }
    if (!osId) {
      osId = uuidv4();
    }
    const newKey = uuidv4();
    const fakeDeviceId = uuidv4();
    const keys = yield call(RSAKeychain.generateKeys, newKey, 2048);
    yield call(
      SecureStore.setItemAsync,
      process.env.EXPO_PUBLIC_SECRET_KEY_NAME,
      newKey
    );
    const pubKey = keys.public;
    const deviceInfo = {
      brand: Device.brand,
      designName: Device.designName,
      deviceYearClass: Device.deviceYearClass,
      isDevice: Device.isDevice,
      manufacturer: Device.manufacturer,
      modelId: Device.modelId,
      modelName: Device.modelName,
      osName: Device.osName,
      productName: Device.productName,
    };
    console.log(deviceInfo);
    const response = yield call(() =>
      timeoutPromise(
        10000,
        fetch(`${baseURL}/mobile/api/public-register-device`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            realDeviceId: osId,
            deviceId: fakeDeviceId,
            phoneNumber: action.payload.phoneNumber,
            publicKey: pubKey,
            deviceInfo: deviceInfo,
          }),
        })
      )
    );
    const data = yield call([response, response.json]);
    yield put(
      deviceRegistrationSuccess({
        token: data.token,
        deviceId: fakeDeviceId,
        phoneNumber: action.payload.phoneNumber,
        expiresAt: Date.now() + 2 * 60 * 1000,
      })
    );

    // Start expiration timer
    const { expired } = yield race({
      expired: delay(2 * 60 * 1000), // 2 minutes
      verified: take(verifyOtpSuccess.type),
    });

    if (expired) {
      yield put(registrationTimeExpired());
    }
  } catch (error) {
    yield put(deviceRegistrationFailure(error.message));
  }
}

function* handleVerifyOtp(action) {
  try {
    // Check lock status first
    yield put(checkLockStatus());
    const { lockedUntil } = yield select((state) => state.device);
    if (lockedUntil) {
      const now = new Date();
      const lockUntil = new Date(lockedUntil);
      if (now < lockUntil) {
        const minutesLeft = Math.ceil((lockUntil - now) / (1000 * 60));
        throw new Error(
          `Device is locked. Please try again in ${minutesLeft} minutes.`
        );
      }
    }

    const { tokenRegistration } = yield select((state) => state.device);
    /*console.log({
      token: tokenRegistration,
      otp: action.payload.otp,
    })*/
    const { data } = yield call(post, "/mobile/api/public-verifikasi-otp", {
      token: tokenRegistration,
      otp: action.payload.otp,
    });

    yield put(
      verifyOtpSuccess({
        jwtAccessToken: data.jwtAccessToken,
      })
    );
  } catch (error) {
    yield put(verifyOtpFailure(error.message));
  }
}

export function* watchDevice() {
  yield takeLatest(startDeviceRegistration.type, handleDeviceRegistration);
  yield takeLatest(verifyOtp.type, handleVerifyOtp);
}
