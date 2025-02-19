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
      state.internalUser.otpToken = null;
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
      state.internalUser.otpToken = null;
    },


    logoutInternal: (state) => {
      state.internalUser.isAuthenticated = false;
      state.internalUser.user = null;
      state.internalUser.otpToken = null;
      state.internalUser.jwtAccessToken = null;
      state.internalUser.otpToken = null;
    },





    // EXTERNAL USER
    tokenExternalRequest: (state, action) => {
      state.externalUser.loading = true;
      state.externalUser.error = null;
    },

    tokenExternalSuccess: (state, action) => {
      state.externalUser.isAuthenticated = true;
      state.externalUser.otpToken = action.payload;
      state.externalUser.loading = false;
      state.externalUser.error = null;
    },
    tokenExternalFailure: (state, action) => {
      state.externalUser.isAuthenticated = false;
      state.externalUser.error = action.payload;
      state.externalUser.loading = false;
      state.externalUser.user = null;
    },

    logoutExternal: (state) => {
      state.externalUser.isAuthenticated = false;
      state.externalUser.user = null;
      state.externalUser.loading = false;
      state.externalUser.error = null;
    },

    // EXTERNAL USER
    tokenCatRequest: (state, action) => {
      state.catUser.loading = true;
      state.catUser.error = null;
    },
    tokenCatSuccess: (state, action) => {
      state.catUser.isAuthenticated = true;
      state.catUser.otpToken = action.payload;
      state.catUser.loading = false;
      state.catUser.error = null;
    },
    tokenCatFailure: (state, action) => {
      state.catUser.isAuthenticated = false;
      state.catUser.error = action.payload;
      state.catUser.loading = false;
      state.catUser.user = null;
    },
    logoutCat: (state) => {
      state.catUser.isAuthenticated = false;
      state.catUser.user = null;
      state.catUser.loading = false;
      state.catUser.error = null;
    }
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
  tokenExternalRequest,
  tokenExternalSuccess,
  tokenExternalFailure,
  logoutExternal,
  tokenCatRequest,
  tokenCatSuccess,
  tokenCatFailure,
  logoutCat
} = authSlice.actions;
export default authSlice.reducer;