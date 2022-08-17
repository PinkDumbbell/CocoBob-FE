import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';

type PlatformType = 'ios' | 'android' | 'windows' | 'mac' | 'os';
interface PlatformState {
  platform: PlatformType;
}
const initialState: PlatformState = {
  platform: 'os',
};

export const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    setPlatform(state, action: PayloadAction<PlatformType>) {
      state.platform = action.payload;
    },
  },
});

const { reducer, actions } = platformSlice;
export const getPlatform = (state: RootState) => state.platform.platform;
export const { setPlatform } = actions;
export default reducer;
