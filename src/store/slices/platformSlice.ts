import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';

type PlatformType = 'ios' | 'android' | 'windows' | 'mac' | 'os';

type PlatformStateType = {
  currentPlatform: PlatformType | null;
};
const initialState: PlatformStateType = {
  currentPlatform: null,
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    setPlatform: (state, { payload }: PayloadAction<PlatformType>) => {
      state.currentPlatform = payload;
    },
  },
});

export const isPopupOpened = (state: RootState) => state.platform;
export const { setPlatform } = confirmSlice.actions;
export default confirmSlice.reducer;
