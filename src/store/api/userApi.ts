import { IAuthenticatedUser, IUser } from '@/@type/user';
import { ILoginForm, ISignUpForm } from '@/pages/Login/types';

import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => '/users',
      transformResponse: (response: IGenericResponse) => response.data as IUser,
    }),
    login: builder.mutation<IAuthenticatedUser, ILoginForm>({
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (loginResult: IGenericResponse) => loginResult.data as IAuthenticatedUser,
    }),
    logout: builder.mutation<IGenericResponse, void>({
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
