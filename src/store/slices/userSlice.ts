/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/@type/user';
import { IGenericResponse } from '@/store/api/types';

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
    representativeAnimal: {
      petId: 101,
      petName: '코코',
      petAge: 42,
      petAllergy: ['닭', '보리', '마늘'],
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
      state.user = {
        userId: 1,
        email: 'test@test.com',
        name: '테스터',
        representativeAnimal: {
          petId: 101,
          petName: '코코',
          petAge: 42,
          petAllergy: ['닭', '보리', '마늘'],
        },
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
