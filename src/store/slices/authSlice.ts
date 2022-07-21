import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store/config';
import { IAuthenticatedUser, IUserLoginResponse } from '@/@type/user';
import { userApiSlice } from '../api/userApi';

const initialState: IAuthenticatedUser = {
  isLoggedIn: false,
  userId: null,
  username: '',
  accessToken: null,
  refreshToken: null,
  email: '',
  role: 'NONE',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<IUserLoginResponse>) => {
      const { accessToken, email, role, userId, username, refreshToken } = payload;
      state.userId = userId;
      state.email = email;
      state.username = username;
      state.role = role;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApiSlice.endpoints.login.matchFulfilled, (state, respoonse) => {
        authSlice.caseReducers.setCredentials(state, respoonse);
      })
      .addMatcher(userApiSlice.endpoints.logout.matchFulfilled, (state) => {
        state.userId = initialState.userId;
        state.email = initialState.email;
        state.username = initialState.username;
        state.role = initialState.role;
        state.accessToken = initialState.accessToken;
        state.refreshToken = initialState.refreshToken;
        state.isLoggedIn = false;
      });
  },
});

export const selectUserId = (state: RootState) => state.auth.userId;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
