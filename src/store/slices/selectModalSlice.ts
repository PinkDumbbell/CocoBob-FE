import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';

const initialState = {
  modalOpened: false,
};
const selectModalSlice = createSlice({
  name: 'selectModal',
  initialState,
  reducers: {
    setSelectModalOpened: (state, { payload }: PayloadAction<boolean>) => {
      state.modalOpened = payload;
    },
  },
});

export const isSelectModalOpened = (state: RootState) => state.selectModal.modalOpened;
export const { setSelectModalOpened } = selectModalSlice.actions;
export default selectModalSlice.reducer;
