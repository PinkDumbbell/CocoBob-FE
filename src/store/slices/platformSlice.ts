import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';

export type PlatformType = 'ios' | 'android' | 'windows' | 'mac' | 'os';

type PlatformStateType = {
  currentPlatform: PlatformType | null;
};
const initialState: PlatformStateType = {
  currentPlatform: null,
};

export const getPlatformInfo = createAsyncThunk('getPlatform', async () => {
  const { platform }: { platform: PlatformType } = await window.flutter_inappwebview.callHandler(
    'platformHandler',
  );
  return platform;
});

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlatformInfo.fulfilled, (state, action) => {
      state.currentPlatform = action.payload;
    });
  },
});

export const getCurrentPlatform = (state: RootState) => state.platform.currentPlatform;

export default confirmSlice.reducer;
