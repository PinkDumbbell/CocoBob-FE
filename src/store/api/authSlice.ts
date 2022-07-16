import { IUserLoginResponse } from '@/@type/user';
import { ILoginForm } from '@/pages/Login/types';
import { apiSlice } from './apiSlice';
import { IGenericResponse } from './types';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
export const { useLoginMutation, useLogoutMutation } = authApiSlice;
