/* eslint-disable import/no-cycle */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import authSlice from './slices/authSlice';
import bottomSheetSlice from './slices/bottomSheetSlice';
import { apiSlice } from './slices/apiSlice';

const rootReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  bottomSheet: bottomSheetSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
