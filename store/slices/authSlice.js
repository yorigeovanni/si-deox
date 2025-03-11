import { createSlice } from '@reduxjs/toolkit';

/*
export interface User {
  id: string;
  email: string;
  type: UserType;
  name: string;
  department?: string;
  position?: string;
  company?: string; // For portal users
  permissions?: string[]; // For internal users
}
*/



const initialState = {
  internalUser : {
    isAuthenticated : false,
    user : null,
    loading : false,
    error : null,
    jwtAccessToken : null,
    loginAttempt: 0,
    lastLoginAttempt: null,
    otpAttempts: 0,
    lockedUntil: null,
    otpToken: null
  },
  externalUser : {
    isAuthenticated : false,
    user : null,
    loading : false,
    error : null,
    jwtAccessToken : null,
    loginAttempt: 0,
    lastLoginAttempt: null,
    otpAttempts: 0,
    lockedUntil: null,
    otpToken: null
  },
  catUser : {
    isAuthenticated : false,
    user : null,
    loading : false,
    error : null,
    jwtAccessToken : null,
    loginAttempt: 0,
    lastLoginAttempt: null,
    otpAttempts: 0,
    lockedUntil: null,
    otpToken: null
  }
};






const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    tokenInternalRequest: (state) => {
      state.internalUser.loading = true;
      state.internalUser.error = null;
    },
    tokenInternalSuccess: (state, action) => {
      state.internalUser.isAuthenticated = false;
      state.internalUser.user = null;
      state.internalUser.loading = false;
      state.internalUser.error = null;
      state.internalUser.jwtAccessToken = null;
      state.internalUser.loginAttempt += 1;
      state.internalUser.lastLoginAttempt = new Date().toISOString();
      state.internalUser.otpToken = action.payload?.token;
    },

    tokenInternalFailure: (state, action) => {
      state.internalUser.isAuthenticated = false;
      state.internalUser.error = action.payload;
      state.internalUser.loading = false;
      state.internalUser.user = null;
      state.internalUser.otpToken = null;
      state.internalUser.loginAttempt += 1;
      state.internalUser.lastLoginAttempt = new Date().toISOString();
    },


    tokenIntenalRequestVerified: (state, action) => {
      state.internalUser.loading = true;
      state.internalUser.error = null;
    },


    tokenIntenalVerified: (state, action) => {
      state.internalUser.isAuthenticated = true;
      state.internalUser.user = action.payload.user;
      state.internalUser.loading = false;
      state.internalUser.error = null;
      state.internalUser.jwtAccessToken = action.payload.jwtAccessToken;
      state.internalUser.loginAttempt = 0;
      state.internalUser.lastLoginAttempt = null;
     // state.internalUser.otpToken = null;
    },


    tokenIntenalVerifiedFailure: (state, action) => {
      state.internalUser.isAuthenticated = false;
      state.internalUser.error = action.payload;
      state.internalUser.loading = false;
      state.internalUser.user = null;
      state.internalUser.otpAttempts += 1;
      state.internalUser.lastLoginAttempt = new Date().toISOString();
    },


    tokenIntenalExpires: (state, action) => {
      state.internalUser.error = 'Opt Login time expired';
      state.internalUser.jwtAccessToken = null;
      state.internalUser.isAuthenticated = false;
      state.internalUser.error = action.payload;
      state.internalUser.loading = false;
      state.internalUser.user = null;
      state.internalUser.otpToken = null;
    },

    logoutInternal: (state) => {
      state.internalUser.isAuthenticated = false;
      state.internalUser.user = null;
      state.internalUser.otpToken = null;
      state.internalUser.jwtAccessToken = null;
      state.internalUser.otpToken = null;
    },
    resetInternalLogin(state) {
      state.internalUser = initialState.internalUser;
    },


    // EXTERNAL USER
    tokenExternalRequest: (state, action) => {
      state.externalUser.loading = true;
      state.externalUser.error = null;
    },

    tokenExternalSuccess: (state, action) => {
      state.externalUser.isAuthenticated = false;
      state.externalUser.user = null;
      state.externalUser.loading = false;
      state.externalUser.error = null;
      state.externalUser.jwtAccessToken = null;
      state.externalUser.loginAttempt += 1;
      state.externalUser.lastLoginAttempt = new Date().toISOString();
      state.externalUser.otpToken = action.payload?.token;
    },


    tokenExternalFailure: (state, action) => {
      state.externalUser.isAuthenticated = false;
      state.externalUser.error = action.payload;
      state.externalUser.loading = false;
      state.externalUser.user = null;
      state.externalUser.otpToken = null;
      state.externalUser.loginAttempt += 1;
      state.externalUser.lastLoginAttempt = new Date().toISOString();
    },

    tokenExternalRequestVerified: (state, action) => {
      state.externalUser.loading = true;
      state.externalUser.error = null;
    },

    tokenExternalVerified: (state, action) => {
      state.externalUser.isAuthenticated = true;
      state.externalUser.user = action.payload.user;
      state.externalUser.loading = false;
      state.externalUser.error = null;
      state.externalUser.jwtAccessToken = action.payload.jwtAccessToken;
      state.externalUser.loginAttempt = 0;
      state.externalUser.lastLoginAttempt = null;
     // state.internalUser.otpToken = null;
    },

    tokenExternalVerifiedFailure:(state, action) => {
      state.externalUser.isAuthenticated = false;
      state.externalUser.error = action.payload;
      state.externalUser.loading = false;
      state.externalUser.user = null;
      state.externalUser.otpAttempts += 1;
      state.externalUser.lastLoginAttempt = new Date().toISOString();
    },
    


    tokenExternalExpires: (state, action) => {
      state.externalUser.error = 'Opt Login time expired';
      state.externalUser.jwtAccessToken = null;
      state.externalUser.isAuthenticated = false;
      state.externalUser.error = action.payload;
      state.externalUser.loading = false;
      state.externalUser.user = null;
      state.externalUser.otpToken = null;
    },


    logoutExternal: (state) => {
      state.externalUser.isAuthenticated = false;
      state.externalUser.user = null;
      state.externalUser.loading = false;
      state.externalUser.error = null;
    },

    resetExternalLogin(state) {
      state.externalUser = initialState.externalUser;
    },

    
    
  }
});


export const {
  tokenInternalRequest,
  tokenInternalSuccess,
  tokenInternalFailure,
  tokenIntenalRequestVerified,
  tokenIntenalVerified,
  tokenIntenalVerifiedFailure,
  tokenIntenalExpires,
  logoutInternal,
  resetInternalLogin,
  tokenExternalRequest,
  tokenExternalSuccess,
  tokenExternalFailure,
  tokenExternalRequestVerified,
  tokenExternalVerified,
  tokenExternalVerifiedFailure,
  tokenExternalExpires,
  logoutExternal,
  resetExternalLogin
  
} = authSlice.actions;
export default authSlice.reducer;