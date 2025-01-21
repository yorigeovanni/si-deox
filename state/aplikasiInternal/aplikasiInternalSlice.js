import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  menuActive: null,
  basePath: '/app-restricted-internal',
  listMenu: [
   /* { 
      icon: 'home-outline', 
      label: 'HOME', 
      path: ``, 
      exact: true, 
      headerTitle: "SIDEO - APLIKASI INTERNAL" 
    },*/
    { 
      icon: 'link-outline', 
      label: 'UNIT AMC', 
      path: `/amc`, 
      exact: true, 
      headerTitle: "TEKOPS - AMC" 
    },
    { 
      icon: 'business-outline', 
      label: 'UNIT ELBAN', 
      path: `/elban`, 
      exact: false, 
      headerTitle: "TEKOPS - ELBAN" 
    },
    { 
      icon: 'person-add-outline', 
      label: 'UNIT LISTRIK ', 
      path: `/listrik`, 
      exact: false, 
      headerTitle: "TEKOPS - LISTRIK" 
    },
    { 
      icon: 'bug-outline', 
      label: 'UNIT BANGLAND', 
      path: `/bangland`, 
      exact: false, 
      headerTitle: "TEKOPS - BANGLAND" 
    },
  ]
};


const aplikasiInternalSlice = createSlice({
  name: 'aplikasiInternal',
  initialState,
  reducers: {
    setMenuActive(state, action) {
      state.menuActive = action.payload;
    },

  },
});

export default aplikasiInternalSlice.actions;
export const aplikasiInternalReducer =  aplikasiInternalSlice.reducer;
