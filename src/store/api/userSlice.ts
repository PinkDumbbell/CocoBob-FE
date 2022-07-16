import { IUser } from '@/@type/user';
import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => '',
    }),
  }),
});
export const { useGetUserQuery } = userApiSlice;
