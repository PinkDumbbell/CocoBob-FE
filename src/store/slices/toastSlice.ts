import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';
// eslint-disable-next-line import/no-cycle

export type ToastMessageType = 'error' | 'success';

export type ToastType = 'withdrawal' | 'logout' | '';

export type ToastState = {
  id: string;
  content: string;
  time: number;
  type: ToastMessageType;
};

export type ToastConfirmState = {
  confirmMessage: string;
  executeCallback: boolean;
  toastType: ToastType;
};

interface IToastSlice extends ToastState, ToastConfirmState {}

const initialState: IToastSlice = {
  id: '',
  content: '',
  time: 3000,
  type: 'error',
  confirmMessage: '',
  toastType: '',
  executeCallback: true,
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
    addConfirmAction: (
      state,
      { payload }: PayloadAction<{ confirmMessage: string; toastType: ToastType }>,
    ) => {
      state.confirmMessage = payload.confirmMessage;
      state.toastType = payload.toastType;
    },
    executeConfirmCallbackAction: (state) => {
      state.executeCallback = true;
    },
    closeConfirmAction: (state) => {
      state.confirmMessage = '';
      state.executeCallback = false;
    },
  },
});

export const getToast = (state: RootState) => state.toast;
export const {
  addToastAction,
  deleteToastAction,
  addConfirmAction,
  closeConfirmAction,
  executeConfirmCallbackAction,
} = toastSlice.actions;
export default toastSlice.reducer;
