/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityLevelType, PetSexType } from '@/@type/pet';
import { RootState } from '../config';

interface IRegisterInfo {
  registerInfo: {
    name: string;
    breedId?: number; // 견종 ID
    petImage?: string;
    sex: PetSexType; // 1: male, 2: female
    isSpayed: boolean; // 중성화
    isPregnant: boolean;
    birthday?: string; // *Nullable
    age: number; // months
    bodyWeight: number;
    activityLevel: ActivityLevelType; // 1~5
  };
}

const initialState: IRegisterInfo = {
  registerInfo: {
    name: '',
    breedId: undefined,
    petImage: undefined,
    sex: '',
    isPregnant: false,
    isSpayed: false,
    age: 0,
    birthday: undefined,
    activityLevel: 3,
    bodyWeight: 0,
  },
};

export interface RegisterInfoForm<T> {
  /* step 1 */
  petImage?: T;
  name?: string;
  sex?: PetSexType;
  isSpayed?: boolean;
  isPregnant?: boolean;

  /* step 2 */
  age?: number;
  birthday?: string;

  /* step3 */
  breedId?: number;

  /* step4 */
  bodyWeight?: number;
  activityLevel?: ActivityLevelType;
}
export const registerPetSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setRegisterInfo(state, action: PayloadAction<RegisterInfoForm<string>>) {
      const { payload } = action;
      state.registerInfo = {
        ...state.registerInfo,
        ...payload,
      };
    },
    clearRegisterInfo(state) {
      state.registerInfo = initialState.registerInfo;
    },
  },
});

const { reducer, actions } = registerPetSlice;
export const selectRegisterInfo = (state: RootState) => state.registerPet.registerInfo;
export const { setRegisterInfo, clearRegisterInfo } = actions;
export default reducer;
