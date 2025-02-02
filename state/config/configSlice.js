import { createSlice } from '@reduxjs/toolkit';
import { BaseSetting } from '@/config';



const initialState = {
  setting: null,
  design: BaseSetting.defaultDesign,
};



const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {


  },
});

export default configSlice.actions;
export const configReducer =  configSlice.reducer;
