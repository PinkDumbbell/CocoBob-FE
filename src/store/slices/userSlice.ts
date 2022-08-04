/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/@type/user';
import { IGenericResponse } from '@/store/api/types';
import { ISimplePet } from '@/@type/pet';

export type UserState = {
  user: IUser | null;
};
export interface UserPayload extends IGenericResponse, IUser {}

const initialState: UserState = {
  user: {
    userId: null,
    email: null,
    name: null,
    representativePet: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction(state: UserState, action: PayloadAction<UserPayload>) {
      const { payload } = action;
      state.user = payload;
    },
    setRepresentativePet(state: UserState, action: PayloadAction<ISimplePet>) {
      if (state.user) {
        state.user.representativePet = action.payload;
      }
    },
    logoutAction() {
      return initialState;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUserAction, logoutAction, setRepresentativePet } = actions;
export default reducer;
