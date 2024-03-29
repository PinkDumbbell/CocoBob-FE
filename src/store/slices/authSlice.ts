import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store/config';
import { IAuthenticatedUser } from '@/@type/user';
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
    setCredentials: (state, { payload }: PayloadAction<IAuthenticatedUser>) => {
      const { accessToken, email, role, userId, username, refreshToken } = payload;
      state.userId = userId;
      state.email = email;
      state.username = username;
      state.role = role;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoggedIn = true;
    },
    updateToken: (
      state,
      { payload }: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      const { accessToken, refreshToken } = payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.userId = initialState.userId;
      state.email = initialState.email;
      state.username = initialState.username;
      state.role = initialState.role;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApiSlice.endpoints.login.matchFulfilled, (state, response) => {
      authSlice.caseReducers.setCredentials(state, response);
    });
  },
});

export const selectUserId = (state: RootState) => state.auth.userId;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUserInfo = (state: RootState) => ({
  email: state.auth.email,
  username: state.auth.username,
  userId: state.auth.userId,
});
export const { setCredentials, updateToken, logout } = authSlice.actions;

export default authSlice.reducer;
