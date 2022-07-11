/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  name: string;
  email: string;
}
export type UserState = {
  isLoggedIn: boolean;
  user: IUser | null;
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
    setUserAction(state: UserState, action: PayloadAction<LoginPayload>) {
      state.isLoggedIn = true;
      state.user = {
        email: action.payload.email,
        name: 'tester',
      };
    },
    logoutAction() {
      return initialState;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUserAction, logoutAction } = actions;
export default reducer;
