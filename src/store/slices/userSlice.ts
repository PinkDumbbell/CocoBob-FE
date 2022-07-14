/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/@type/user';
import { IGenericResponse } from '@/utils/api/types';
import { IPet } from '@/@type/pet';

export type UserState = {
  isLoggedIn: boolean;
  user: IUser | null;
};
export interface UserPayload extends IGenericResponse, IUser {}

const initialState: UserState = {
  isLoggedIn: true,
  user: {
    userId: 1,
    email: 'test@test.com',
    name: '테스터',
    representativePet: {
      petId: 101,
      petName: '코코',
      petAge: 42,
      petAllergy: ['닭', '보리', '마늘'],
      petBreed: '잡종',
      spayed: false,
      pregnant: false,
      bodyWeight: 2.9,
      activityLevel: 4,
    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    setUserAction(state: UserState, action: PayloadAction<UserPayload>) {
      state.isLoggedIn = true;
      state.user = initialState.user;
    },
    setRepresentativePet(state: UserState, action: PayloadAction<IPet>) {
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
