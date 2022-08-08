import { IProductDetail, IProductList } from '@/@type/product';
import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<IProductList, void>({
      query: () => '/products/search',
      transformResponse: (response: IGenericResponse) => response.data as IProductList,
    }),
    getProductDetail: builder.query<IProductDetail, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: IGenericResponse) => response.data as IProductDetail,
    }),
  }),
});

export const { useGetProductQuery, useGetProductDetailQuery } = productApiSlice;
