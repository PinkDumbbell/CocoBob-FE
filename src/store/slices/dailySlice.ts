import { getDateString } from '@/utils/libs/date';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';

interface IDailyState {
  date: string | null; // YYYY-MM-DD
}
const initialState: IDailyState = {
  date: null,
};

export const dailySlice = createSlice({
  name: 'daily',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<{ date: string }>) {
      const { payload } = action;
      state.date = payload.date;
    },
    setToday(state) {
      state.date = getDateString(new Date());
    },
  },
});

const { reducer, actions } = dailySlice;
export const getDailyDate = (state: RootState) =>
  state.daily.date ? new Date(state.daily.date) : new Date();
export const getDailyDateString = (state: RootState) =>
  state.daily.date ?? getDateString(new Date());
export const { setDate, setToday } = actions;
export default reducer;
