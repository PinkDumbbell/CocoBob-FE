import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';

const initialState = {
  popupOpened: false,
};
const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    setPopupOpened: (state, { payload }: PayloadAction<boolean>) => {
      state.popupOpened = payload;
    },
  },
});

export const isPopupOpened = (state: RootState) => state.confirm.popupOpened;
export const { setPopupOpened } = confirmSlice.actions;
export default confirmSlice.reducer;
