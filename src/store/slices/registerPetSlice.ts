/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPet } from '@/@type/pet';

const initialState: IPet = {
  activityLevel: 3,
  bodyWeight: 0,
  petAge: 0,
  petAllergy: [],
  petBreed: '',
  petId: 1,
  petName: '',
  pregnant: false,
  spayed: false,
};

interface RegisterInfo {
  petName?: string;
  petSex?: 'male' | 'female' | '';
}
export const registerPetSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setRegisterInfo(state, action: PayloadAction<RegisterInfo>) {
      const { payload } = action;
      state = { ...state, ...payload };
    },
  },
});

const { reducer, actions } = registerPetSlice;
export const { setRegisterInfo } = actions;
export default reducer;
