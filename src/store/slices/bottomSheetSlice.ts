import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store/config';

export type BottomSheetType =
  | ''
  | 'emailLogin'
  | 'signUp'
  | 'birthday'
  | 'monthsAge'
  | 'findBreed'
  | 'walkSelector';
export type BottomSheetState = {
  bottomSheet: BottomSheetType;
};

const initialState: BottomSheetState = {
  bottomSheet: '',
};
const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    setBottomSheetAction: (state, { payload }: { payload: BottomSheetType }) => {
      state.bottomSheet = payload;
    },
    closeBottomSheetAction: (state) => {
      state.bottomSheet = '';
    },
  },
});

export const selectBottomSheet = (state: RootState): BottomSheetType =>
  state.bottomSheet.bottomSheet;
export const { setBottomSheetAction, closeBottomSheetAction } = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
