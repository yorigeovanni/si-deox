import { createSlice } from '@reduxjs/toolkit';
import menuTekops from './menu-tekops';
import menuUtama from './menu-utama';
import menuTataUsaha from './menu-tata-usaha';
import menuKampen from './menu-kampen';
import menuJasban from './menu-jasban';

const initialState = {
  headerTitle: "SIDEO - APLIKASI INTERNAL",
  headerDescription: "Sistem Informasi Dokumentasi Operasional",
  menuActive: {
    parent: null,
    children: [],
    visible: false
  },
  menuTekops: menuTekops,
  menuUtama: menuUtama,
  menuTataUsaha: menuTataUsaha,
  menuKampen: menuKampen,
  menuJasban: menuJasban,
  
};




const aplikasiInternalSlice = createSlice({
  name: 'aplikasiInternal',
  initialState,
  reducers: {
    setTitle(state, action) {
      state.headerTitle = action.payload?.title;
      state.headerDescription = action.payload?.description;
    },
    setMenuActive(state, action) {
      state.menuActive = action.payload;
    },
  },
});

export default aplikasiInternalSlice.actions;
export const aplikasiInternalReducer = aplikasiInternalSlice.reducer;
