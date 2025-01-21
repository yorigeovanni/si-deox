import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nik_nip : null,
  tokenLogin : null,
  isLoading : false,
  isError: false,
  user : null,
  roles: [],
  jwtAccessToken : null,
  registerAtempt: 0,
  lastRegisterAtempt: null
};



const internalUserSlice = createSlice({
  name: 'internalUser',
  initialState,
  reducers: {

    requestToken(state, action) {
      state.isLoading = true;
      state.isError = false;
    },

    successRequestToken(state, action) {  
      state.isLoading = false;
      state.isError = false;
      state.nik_nip = action.payload?.nik_nip;
      state.tokenLogin = action.payload?.token;
      state.lastRegisterAtempt = new Date().toISOString();
      state.registerAtempt = state.registerAtempt + 1;
    },

    errorRequestToken(state, action) {  
      state.isLoading = false;
      state.isError = true;
    },



    reloadOtp(state, action) {  
      state.isLoading = true;
      state.isError = false;
    },

    successReloadOtp(state,action) {
      state.isLoading = false;
      state.isError = false;
      state.tokenLogin = action.payload?.token;
      state.lastRegisterAtempt = new Date().toISOString();
      state.registerAtempt = state.registerAtempt + 1;
    },


    errorReloadOtp(state) {
      state.isLoading = false;
      state.isError = true;
    },



    verifikasiOtp(state, action) {  
      state.isLoading = true;
      state.isError = false;
    },


    successVerifikasiOtp(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.nik_nip = null;
      state.tokenLogin = null;
      state.user = action.payload?.user || null;
      state.jwtAccessToken = action.payload?.jwtAccessToken || null;
      state.lastRegisterAtempt = null;
      state.registerAtempt = 0;
    },

    
    errorVerifikasiOtp(state, action) {
      state.isLoading = false;
      state.isError = true;
    },

    logout(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.nik_nip = null;
      state.tokenLogin = null;
      state.user = null;
      state.jwtAccessToken = null;
      state.lastRegisterAtempt = null;
      state.registerAtempt = 0;
    },




  },
});

export default internalUserSlice.actions;
export const internalUserReducer =  internalUserSlice.reducer;
