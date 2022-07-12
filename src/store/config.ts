/* eslint-disable import/no-cycle */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userApi } from '@/utils/api/userApi';
import userSlice from './slices/userSlice';
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  [userApi.reducerPath]: userApi.reducer,
});

const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
