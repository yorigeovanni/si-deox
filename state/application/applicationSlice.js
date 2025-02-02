import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: null,
  font: null,
  force_dark: false,
  language: null,
  lastRegisterAtempt: null
};



const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {

   

  },
});

export default applicationSlice.actions;
export const applicationReducer =  applicationSlice.reducer;
