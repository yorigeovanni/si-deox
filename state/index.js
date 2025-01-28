import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './rootReducers';
import rootSagas from './rootSagasMidlewares';



const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth','config', "internalUser", "externalUser"], 
  timeout: 100000,
};




const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}




const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        // Abaikan action2 bawaan redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});



sagaMiddleware.run(rootSagas);
const persistor = persistStore(store);
export {store, persistor};