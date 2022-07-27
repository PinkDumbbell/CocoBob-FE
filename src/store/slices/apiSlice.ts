import { RootState } from '@/store/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, updateToken } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // accessToken 또는 refreshToken 만료 시 401에러 반환
  if (result?.error?.status === 401) {
    console.log('accessToken expired');
    const refreshResult = await baseQuery('/users/token', api, extraOptions);
    /**
     * {
          "accessToken": "string",
          "refreshToken": "string"
        }
     */

    console.log(refreshResult);
    if (refreshResult?.data) {
      // store new token
      api.dispatch(
        updateToken({
          ...(refreshResult.data as { accessToken: string; refreshToken: string }),
        }),
      );
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
