import { IUser, IUserLoginResponse } from '@/@type/user';
import { ILoginForm } from '@/pages/Login/types';

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
    logout: builder.mutation<IGenericResponse, void>({
      query: () => ({
        url: '/users',
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginMutation, useLogoutMutation } = userApiSlice;

export const selectUserResult = userApiSlice.endpoints.getUser.select();
