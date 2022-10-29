import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';

export type PlatformType = 'ios' | 'android' | 'windows' | 'mac' | 'os';

type PlatformStateType = {
  currentPlatform: PlatformType | null;
};
const initialState: PlatformStateType = {
  currentPlatform: null,
};

const getPlatformInfo = async () => {
  const { platform }: { platform: PlatformType } = await window.flutter_inappwebview.callHandler(
    'platformHandler',
  );
  return platform;
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    setPlatform: (state) => {
      const platformHandler = async function () {
        state.currentPlatform = await getPlatformInfo();
      };
      platformHandler();
    },
  },
});

export const getCurrentPlatform = (state: RootState) => state.platform.currentPlatform;
export const { setPlatform } = confirmSlice.actions;
export default confirmSlice.reducer;
