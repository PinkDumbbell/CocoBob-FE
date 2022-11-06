/* eslint-disable import/no-cycle */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slices/userSlice';
import authSlice from './slices/authSlice';
import bottomSheetSlice from './slices/bottomSheetSlice';
import { apiSlice } from './slices/apiSlice';
import toastSlice from './slices/toastSlice';
import dailySlice from './slices/dailySlice';
import confirmSlice from './slices/confirmSlice';
import selectModalSlice from './slices/selectModalSlice';
import platformSlice from './slices/platformSlice';
import productsSlice from './slices/productsSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['toast', 'confirm', 'selectModal', 'platform', 'products'],
};

const appReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  bottomSheet: bottomSheetSlice,
  toast: toastSlice,
  daily: dailySlice,
  confirm: confirmSlice,
  selectModal: selectModalSlice,
  platform: platformSlice,
  products: productsSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducer: Reducer = (state: ReturnType<typeof appReducer>, action: AnyAction) => {
  if (action.type === 'auth/logout') {
    storage.removeItem('persist:root');

    return appReducer({} as ReturnType<typeof appReducer>, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['payload.date'],
      },
    }).concat(apiSlice.middleware),
  preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
export default store;
