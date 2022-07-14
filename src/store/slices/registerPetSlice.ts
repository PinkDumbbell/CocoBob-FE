/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPet } from '@/@type/pet';
import { IDetailInfo } from '@/pages/RegisterPet/DetailInfo';
import { IBasicInfo } from '@/pages/RegisterPet/BasicInfo';

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
export const registerPetSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setBasicInfo(state: IPet, action: PayloadAction<IBasicInfo>) {
      const { petAge, petBreed, petName } = action.payload;
      state.petAge = petAge;
      state.petBreed = petBreed;
      state.petName = petName;
    },
    setDetailInfo(state: IPet, action: PayloadAction<IDetailInfo>) {
      const { activityLevel, bodyWeight, pregnant, spayed } = action.payload;
      state.activityLevel = activityLevel;
      state.bodyWeight = bodyWeight;
      state.pregnant = pregnant;
      state.spayed = spayed;
    },
  },
});

const { reducer, actions } = registerPetSlice;
export const { setBasicInfo, setDetailInfo } = actions;
export default reducer;
