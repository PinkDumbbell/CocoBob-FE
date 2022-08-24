import { ProductType, ProductListType, SearchFilterType } from '@/@type/product';
import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<ProductListType, SearchFilterType | void>({
      query: (arg) => {
        return {
          url: '/products/search',
          params: { ...arg, size: arg?.size ?? 20 },
        };
      },
      transformResponse: (response: IGenericResponse<ProductListType>) => response.data,
    }),
    getProductDetail: builder.query<ProductType, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: IGenericResponse<ProductType>) => response.data,
    }),
    getRecommendProduct: builder.query<ProductListType, any>({
      query: ({ petId, type }: { petId: number; type: 'aged' | 'pregnancy' }) =>
        `/products/recommendation/${type}?petId=${petId}`,
      transformResponse: (response: IGenericResponse<ProductListType>) => response.data,
    }),
  }),
});

export const {
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetProductDetailQuery,
  useGetRecommendProductQuery,
  useLazyGetRecommendProductQuery,
} = productApiSlice;
