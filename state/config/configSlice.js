import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading : false,
  isError: false,
  deviceId : null,
  phoneNumber : null,
  privateKey : null,
  publicKey : null,
  tokenRegistrasi : null,
  isRegistered: false,
  jwtAccessToken : null,
  registerAtempt: 0,
  lastRegisterAtempt: null
};



const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {

    startRegisterDevice(state, action) {
      state.isLoading = true;
      state.isError = false;
    },

    succesRegisterDevice(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.tokenRegistrasi = action.payload?.token;
      state.deviceId = action.payload?.deviceId;
      state.phoneNumber = action.payload?.phoneNumber;
      state.privateKey = action.payload?.privateKey;
      state.publicKey = action.payload?.publicKey;
      state.lastRegisterAtempt = new Date().toISOString();
      state.registerAtempt = state.registerAtempt + 1;
    },

    errorRegisterDevice(state) {
      state.isLoading = false;
      state.isError = true;
    },

    reloadOtp(state) {
      state.isLoading = true;
      state.isError = false;
    },

    successReloadOtp(state,action) {
      state.tokenRegistrasi = action.payload?.token || null;
      state.isLoading = false;
      state.isError = false;
      state.lastRegisterAtempt = new Date().toISOString();
      state.registerAtempt = state.registerAtempt + 1;
    },

    errorReloadOtp(state) {
      state.isLoading = false;
      state.isError = true;
    },


    verifikasiOtp(state) {
      state.isLoading = true;
      state.isError = false;
    },


    successVerifikasiOtp(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isRegistered = true;
      state.jwtAccessToken = action.payload?.jwtAccessToken || null;
      state.lastRegisterAtempt = null;
      state.registerAtempt = 0;
    },

    
    errorVerifikasiOtp(state, action) {
      state.isLoading = false;
      state.isError = true;
    },



    ressetRegisterInfo(state) {
      state.jwtAccessToken = null
    },

  },
});

export default configSlice.actions;
export const configReducer =  configSlice.reducer;
