import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  deviceId: null,
  phoneNumber: null,
  publicKey: null,
  tokenRegistration: null,
  isRegistered: false,
  jwtAccessToken: null,
  registrationAttempt: 0,
  lastRegistrationAttempt: null,
  otpAttempts: 0,
  lockedUntil: null
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    startDeviceRegistration(state, action) {
      state.isLoading = true;
      state.isError = false;
    },
    deviceRegistrationSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.tokenRegistration = action.payload?.token;
      state.deviceId = action.payload?.deviceId;
      state.phoneNumber = action.payload?.phoneNumber;
      state.publicKey = action.payload?.publicKey;
      state.lastRegistrationAttempt = new Date().toISOString();
      state.registrationAttempt = state.registrationAttempt + 1;
      state.otpAttempts = 0;
      state.lockedUntil = null;
    },
    deviceRegistrationFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    registrationTimeExpired(state) {
      state.errorMessage = 'Registration time expired';
      state.isLoading = false;
      state.isError = true;
      state.deviceId = null;
      state.phoneNumber = null;
      state.publicKey = null;
      state.tokenRegistration = null;
      state.isRegistered = false;
      state.jwtAccessToken = null;
      state.otpAttempts = 0;
      state.lockedUntil = null;
    },
    verifyOtp(state) {
      state.isLoading = true;
      state.isError = false;
    },
    verifyOtpSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isRegistered = true;
      state.jwtAccessToken = action.payload?.jwtAccessToken;
      state.lastRegistrationAttempt = null;
      state.registrationAttempt = 0;
      state.otpAttempts = 0;
      state.lockedUntil = null;
    },
    verifyOtpFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
      state.otpAttempts += 1;
      
      if (state.otpAttempts >= 3) {
        const now = new Date();
        // Set lockout time to exactly 15 minutes (900000 milliseconds) from now
        const lockoutTime = new Date(now.getTime() + 900000);
        state.lockedUntil = lockoutTime.toISOString();
        state.errorMessage = 'Too many failed attempts. Please try again in 15 minutes.';
        // Reset registration state when max attempts reached
        state.tokenRegistration = null;
        state.deviceId = null;
        state.phoneNumber = null;
        state.publicKey = null;
        state.lastRegistrationAttempt = null;
      }
    },
    resetRegistration(state) {
      return initialState;
    },
    checkLockStatus(state) {
      if (state.lockedUntil) {
        const now = new Date();
        const lockUntil = new Date(state.lockedUntil);
        
        if (now >= lockUntil) {
          return initialState;
        }
      }
    }
  }
});

export const {
  startDeviceRegistration,
  deviceRegistrationSuccess,
  deviceRegistrationFailure,
  registrationTimeExpired,
  verifyOtp,
  verifyOtpSuccess,
  verifyOtpFailure,
  resetRegistration,
  checkLockStatus
} = deviceSlice.actions;

export default deviceSlice.reducer;