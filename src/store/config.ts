/* eslint-disable import/no-cycle */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slices/userSlice';
import authSlice from './slices/authSlice';
import bottomSheetSlice from './slices/bottomSheetSlice';
import registerPetSlice from './slices/registerPetSlice';
import { apiSlice } from './slices/apiSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['registerPet'],
};

const rootReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  registerPet: registerPetSlice,
  bottomSheet: bottomSheetSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
export default store;
