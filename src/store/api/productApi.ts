import { IProductDetail, IProductList, IProductSearch } from '@/@type/product';
import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<IProductList, IProductSearch | void>({
      query: (arg) => {
        return { url: '/products/search', params: { ...arg, size: arg?.size ?? 20 } };
      },
      transformResponse: (response: IGenericResponse<IProductList>) => response.data,
    }),
    getProductDetail: builder.query<IProductDetail, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: IGenericResponse<IProductDetail>) => response.data,
    }),
  }),
});

export const { useGetProductQuery, useGetProductDetailQuery } = productApiSlice;
