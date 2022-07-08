/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
};
export type LoginPayload = {
  email: string;
  password: string;
};

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction(state: UserState, action: PayloadAction<LoginPayload>) {
      state.isLoggedIn = true;
      state.user = {
        email: action.payload.email,
        name: 'tester',
      };
    },
    logoutAction(state: UserState) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

const { reducer, actions } = userSlice;
export const { loginAction, logoutAction } = actions;
export default reducer;
