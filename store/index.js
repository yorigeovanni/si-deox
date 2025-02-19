import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
   'auth',
    'ui', 
    'app',
    'device'
  ], // Persist these reducers
  blacklist: [], // Don't persist these reducers
  timeout: 100000,
};

const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];

if (__DEV__) {
  middleware.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(middleware),
});

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);


export { store, persistor };