import { IUser, IUserLoginResponse } from '@/@type/user';
import { ILoginForm, ISignUpForm } from '@/pages/Login/types';

import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => '/users',
    }),
    login: builder.mutation<IUserLoginResponse, ILoginForm>({
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<String, void>({
      query: () => ({
        url: '/users',
        method: 'DELETE',
      }),
    }),
    signUp: builder.mutation<IGenericResponse, ISignUpForm>({
      query: (data) => ({
        url: '/users/new',
        method: 'POST',
        body: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginMutation, useLogoutMutation, useSignUpMutation } =
  userApiSlice;

export const selectUserResult = userApiSlice.endpoints.getUser.select();
