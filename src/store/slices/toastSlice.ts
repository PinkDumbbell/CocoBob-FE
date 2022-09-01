import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';

export type ToastMessageType = 'error' | 'success';

export type ToastState = {
  id: string;
  content: string;
  time: number;
  type: ToastMessageType;
};

const initialState: ToastState = {
  id: '',
  content: '',
  time: 3000,
  type: 'error',
};
const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToastAction: (state, { payload }: PayloadAction<ToastState>) => {
      state.id = payload.id;
      state.content = payload.content;
      state.time = payload.time ?? 3000;
      state.type = payload.type ?? 'error';
    },
    deleteToastAction: (state) => {
      state.content = '';
    },
  },
});

export const getToast = (state: RootState) => state.toast;
export const { addToastAction, deleteToastAction } = toastSlice.actions;
export default toastSlice.reducer;
