import { IUser, IUserLoginResponse } from '@/@type/user';
import { ILoginForm } from '@/pages/Login/types';
import { RootState } from '@/store/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenericResponse } from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BASE_URL || 'localhost:8080'}/v1/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('authentication', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => '',
    }),
    login: builder.mutation<IUserLoginResponse, ILoginForm>({
      query: (credentials) => ({
        url: '',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<IGenericResponse, void>({
      query: () => ({
        url: '',
        method: 'POST',
      }),
    }),
  }),
});
export const { useLoginMutation, useGetUserQuery, useLogoutMutation } = userApi;
