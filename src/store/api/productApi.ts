import { IProductDetail, IProductList } from '@/@type/product';
import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<IProductList, void>({
      query: () => '/products/search',
      transformResponse: (response: IGenericResponse<IProductList>) => response.data,
    }),
    getProductDetail: builder.query<IProductDetail, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: IGenericResponse<IProductDetail>) => response.data,
    }),
  }),
});

export const { useGetProductQuery, useGetProductDetailQuery } = productApiSlice;
