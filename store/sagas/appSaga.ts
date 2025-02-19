import { takeLatest, put, call, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  setNetworkStatus, 
  setMaintenance,
  setDeviceInfo,
  setFirstLaunch 
} from '../slices/appSlice';
import { showNotification } from '../slices/uiSlice';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* handleNetworkChange(action: PayloadAction<'online' | 'offline'>) {
  try {
    yield put(setNetworkStatus(action.payload));
    
    if (action.payload === 'offline') {
      yield put(showNotification({
        message: 'You are currently offline',
        type: 'warning'
      }));
    } else {
      yield put(showNotification({
        message: 'Back online',
        type: 'success'
      }));
    }
  } catch (error) {
    console.error('Network change handling error:', error);
  }
}

function* handleMaintenanceCheck() {
  try {
    // Here you would typically make an API call to check maintenance status
    // For now, we'll simulate it
    const isUnderMaintenance = false;
    const maintenanceMessage = 'System is under maintenance. Please try again later.';

    yield put(setMaintenance({
      isUnderMaintenance,
      message: isUnderMaintenance ? maintenanceMessage : ''
    }));

    if (isUnderMaintenance) {
      yield put(showNotification({
        message: maintenanceMessage,
        type: 'warning'
      }));
    }
  } catch (error) {
    console.error('Maintenance check error:', error);
  }
}

function* handleDeviceInfoUpdate() {
  try {
    const deviceInfo = {
      id: yield call([Device, Device.getDeviceId]),
      platform: Device.osName,
      version: Device.osVersion
    };
    yield put(setDeviceInfo(deviceInfo));
  } catch (error) {
    console.error('Device info update error:', error);
  }
}

function* handleFirstLaunchCheck() {
  try {
    const hasLaunched = yield call([AsyncStorage, AsyncStorage.getItem], 'hasLaunched');
    
    if (!hasLaunched) {
      yield call([AsyncStorage, AsyncStorage.setItem], 'hasLaunched', 'true');
      yield put(setFirstLaunch(true));
    } else {
      yield put(setFirstLaunch(false));
    }
  } catch (error) {
    console.error('First launch check error:', error);
    yield put(setFirstLaunch(false));
  }
}

export function* watchApp() {
  yield takeLatest('app/checkNetworkStatus', handleNetworkChange);
  yield takeLatest('app/checkMaintenance', handleMaintenanceCheck);
  yield takeLatest('app/updateDeviceInfo', handleDeviceInfoUpdate);
  yield takeLatest('app/checkFirstLaunch', handleFirstLaunchCheck);
}