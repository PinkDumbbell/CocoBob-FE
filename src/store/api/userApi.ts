import { IAuthenticatedUser, IUser } from '@/@type/user';
import { ILoginForm, ISignUpForm } from '@/pages/Login/types';

import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => '/users',
      transformResponse: (response: IGenericResponse<IUser>) => response.data,
      providesTags: ['User'],
    }),
    login: builder.mutation<IAuthenticatedUser, ILoginForm>({
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (loginResult: IGenericResponse<IAuthenticatedUser>) => loginResult.data,
    }),
    logout: builder.mutation<IGenericResponse<void>, void>({
      query: () => ({
        url: '/users',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    signUp: builder.mutation<IGenericResponse<{ userId: number }>, ISignUpForm>({
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
