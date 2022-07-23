/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPet } from '@/@type/pet';
import { RootState } from '../config';

interface IRegisterInfo {
  registerInfo: IPet;
}
const initialState: IRegisterInfo = {
  registerInfo: {
    petId: 1,
    petName: '',
    petSex: '',
    isPregnant: false,
    isSpayed: false,
    petAge: 0,
    petBirthday: '',
    petBreed: '',
    activityLevel: 3,
    bodyWeight: 0,
    petAllergy: [],
  },
};

interface RegisterInfo {
  /* step 1 */
  petName?: string;
  petSex?: 'male' | 'female' | '';
  isSpayed?: boolean;
  isPregnant?: boolean;

  /* step 2 */
  petAge?: number;
  petBirthday?: string;
}
export const registerPetSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setRegisterInfo(state, action: PayloadAction<RegisterInfo>) {
      const { payload } = action;
      state.registerInfo = {
        ...state.registerInfo,
        ...payload,
      };
      console.log('in redux store', state.registerInfo);
    },
  },
});

const { reducer, actions } = registerPetSlice;
export const selectRegisterInfo = (state: RootState) => state.registerPet.registerInfo;
export const { setRegisterInfo } = actions;
export default reducer;
