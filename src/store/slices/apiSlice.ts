import { RootState } from '@/store/config';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenericResponse } from '../api/types';
import { logout, updateToken } from './authSlice';

type BaseQueryApi = {
  signal: AbortSignal;
  dispatch: ThunkDispatch<any, any, any>;
  getState: () => unknown;
  extra: unknown;
  endpoint: string;
  type: 'query' | 'mutation';
  forced?: boolean;
};
interface RefreshedTokenResult {
  accessToken: string;
  refreshToken: string;
}

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/v1`;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    console.log('set token in header');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const refreshQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken, refreshToken } = (getState() as RootState).auth;

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    if (refreshToken) {
      headers.set('refresh-token', `Bearer ${refreshToken}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);

  // token expired
  if (result?.error?.status === 401) {
    console.log('accessToken expired');
    const { meta, data, error } = await refreshQuery('/users/token', api, extraOptions);
    console.log(meta, data, error);
    if (!data || error?.status === 401 || (data && (data as IGenericResponse).status === 401)) {
      // error occured
      alert('로그인이 필요합니다.');
      api.dispatch(logout());
    } else if (data && (data as IGenericResponse).status === 202) {
      // store new token
      api.dispatch(
        updateToken({
          ...((data as IGenericResponse).data as RefreshedTokenResult),
        }),
      );
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
