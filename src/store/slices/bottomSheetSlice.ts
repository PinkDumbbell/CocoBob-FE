import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store/config';

export type BottomSheetState = {
  bottomSheet: '' | 'emailLogin' | 'signUp' | 'exact' | 'ambiguous';
};

const initialState: BottomSheetState = {
  bottomSheet: '',
};
const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    setBottomSheetAction: (state, { payload }) => {
      state.bottomSheet = payload;
    },
    closeBottomSheetAction: (state) => {
      state.bottomSheet = '';
    },
  },
});

export const selectBottomSheet = (state: RootState) => state.bottomSheet.bottomSheet;
export const { setBottomSheetAction, closeBottomSheetAction } = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
