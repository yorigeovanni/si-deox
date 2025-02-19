import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isFirstLaunch: boolean;
  version: string;
  networkStatus: 'online' | 'offline';
  maintenance: {
    isUnderMaintenance: boolean;
    message: string;
  };
  deviceInfo: {
    id: string;
    platform: string;
    version: string;
  } | null;
}

const initialState: AppState = {
  isFirstLaunch: true,
  version: '1.0.0',
  networkStatus: 'online',
  maintenance: {
    isUnderMaintenance: false,
    message: '',
  },
  deviceInfo: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    setNetworkStatus: (state, action: PayloadAction<'online' | 'offline'>) => {
      state.networkStatus = action.payload;
    },
    setMaintenance: (state, action: PayloadAction<{ isUnderMaintenance: boolean; message: string }>) => {
      state.maintenance = action.payload;
    },
    setDeviceInfo: (state, action: PayloadAction<AppState['deviceInfo']>) => {
      state.deviceInfo = action.payload;
    },
  },
});

export const { setFirstLaunch, setNetworkStatus, setMaintenance, setDeviceInfo } = appSlice.actions;
export default appSlice.reducer;