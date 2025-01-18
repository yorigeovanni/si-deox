import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  //public user
  accessToken: null,
  hashing: null,

  // internal User
  isErrorFetchInternal : false,
  errorFetchInternalMessage : null,
  isLoadingFetchInternal : false,
  userInternal : null,
  tokenInternal : null,
  hasInternal : null,

  // external User
  isErrorFetchExternal : false,
  errorFetchExternalMessage : null,
  isLoadingFetchExternal : false,
  userExternal : null,
  tokenExternal : null,
  hasExternal : null,

};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

        
    loginInternal(state, action) {
      state.isErrorFetchInternal = false;
      state.isLoadingFetchInternal = true;
    },

    loginInternalSuccess(state, action) {
      state.userInternal = action.payload.userInternal;
      state.tokenInternal = action.payload.tokenInternal;
      state.hasInternal = action.payload.hasInternal;
      state.isErrorFetchExternal = false;
      state.isLoadingFetchExternal = false;
    },

    logoutInternal(state, action) {
      state.userInternal = null;
      state.tokenInternal = null;
      state.hasInternal = null;
      state.isErrorFetchExternal = false;
      state.isLoadingFetchExternal = false;
    },


    loginInternalFailed(state, action) {
      state.isErrorFetchInternal = true;
      state.isLoadingFetchInternal = false; 
      state.errorFetchInternalMessage = action.payload;
    },

    loginExternal(state) {
      state.isErrorFetchExternal = false;
      state.isLoadingFetchExternal = true;
    },

    loginExternalSuccess(state, action) {
      state.userExternal = action.payload;
      state.isLoadingFetchExternal = false;
      state.isErrorFetchExternal = false;
    },

    loginExternalFailed(state) {
      state.isErrorFetchExternal = true;
      state.isLoadingFetchExternal = false;
    },


    setAuthData(state, action) {
      const { accessToken, hashing } = action.payload;
      state.accessToken = accessToken;
      state.hashing = hashing;
    },

    clearAuthData(state) {
      state.accessToken = null;
      state.hashing = null;
    },

  },
});

export default authSlice.actions;
export const authReducer =  authSlice.reducer;
