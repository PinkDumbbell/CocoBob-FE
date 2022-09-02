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
    const { data, error } = await refreshQuery('/users/token', api, extraOptions);
    if (
      !data ||
      error?.status === 401 ||
      (data && (data as IGenericResponse<any>).status === 401)
    ) {
      // error occured
      api.dispatch(logout());
    } else if (data && (data as IGenericResponse<any>).status === 202) {
      // store new token
      api.dispatch(
        updateToken({
          ...((data as IGenericResponse<any>).data as RefreshedTokenResult),
        }),
      );
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

const apiSliceWithoutTag = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
export const apiSlice = apiSliceWithoutTag.enhanceEndpoints({
  addTagTypes: ['Pet', 'Breed', 'User', 'Daily', 'Product', 'ProductDetail', 'RecommendProduct'],
});
