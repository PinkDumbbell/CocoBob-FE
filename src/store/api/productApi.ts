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
    getRecommendProduct: builder.query<IProductList, any>({
      query: ({ petId, type }: { petId: number; type: 'aged' | 'pregnancy' }) =>
        `/products/recommendation/${type}?petId=${petId}`,
      transformResponse: (response: IGenericResponse<IProductList>) => response.data,
    }),
  }),
});

export const {
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetProductDetailQuery,
  useGetRecommendProductQuery,
} = productApiSlice;
