import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store/config';
import { userApi } from '@/utils/api/userApi';

export type AuthState = {
  userId: number | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  userId: null,
  accessToken: null,
  refreshToken: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { userId, accessToken, refreshToken },
      }: PayloadAction<{ userId: number; accessToken: string; refreshToken: string }>,
    ) => {
      state.userId = userId;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        const { userId, accessToken, refreshToken } = payload;
        state.userId = userId;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        state.userId = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.userId;
export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
