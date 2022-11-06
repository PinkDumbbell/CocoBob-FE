import { IAuthenticatedUser, IUser } from '@/@type/user';
import { ILoginForm, ISignUpForm } from '@/pages/Login/types';

import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => '/v1/users',
      transformResponse: (response: IGenericResponse<IUser>) => response.data,
      providesTags: [{ type: 'User' }],
    }),
    login: builder.mutation<IAuthenticatedUser, ILoginForm>({
      query: (credentials) => ({
        url: '/v1/users',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (loginResult: IGenericResponse<IAuthenticatedUser>) => loginResult.data,
    }),
    logout: builder.mutation<IGenericResponse<void>, void>({
      query: () => ({
        url: '/v1/users',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    signUp: builder.mutation<IGenericResponse<{ userId: number }>, ISignUpForm>({
      query: (data) => ({
        url: '/v1/users/new',
        method: 'POST',
        body: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
    }),
    withdrawal: builder.mutation<IGenericResponse<void>, void>({
      query: () => ({
        url: '/v1/users/withdrawal',
        method: 'DELETE',
      }),
    }),
    changeRepresentativePet: builder.mutation<IGenericResponse<void>, number>({
      query: (petId) => {
        return {
          url: '/v1/users/representative-pet',
          method: 'PATCH',
          body: {
            representativePetId: petId,
          },
        };
      },
      invalidatesTags: () => [{ type: 'User' }, { type: 'Pet' as const, id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useWithdrawalMutation,
  useChangeRepresentativePetMutation,
} = userApiSlice;

export const selectUserResult = userApiSlice.endpoints.getUser.select();
