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
      providesTags: (result) =>
        result?.productList
          ? [
              ...result.productList.map((value) => ({
                type: 'Product' as const,
                id: value.productId,
              })),
            ]
          : [{ type: 'Product' as const, id: 'LIST' }],
    }),
    getProductDetail: builder.query<ProductType, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: IGenericResponse<ProductType>) => response.data,
      providesTags: (result) => [{ type: 'ProductDetail', id: result?.productId }],
    }),
    getRecommendProduct: builder.query<
      ProductListType,
      { petId: number; type: 'aged' | 'pregnancy' }
    >({
      query: ({ petId, type }) => `/products/recommendation/${type}?petId=${petId}`,
      transformResponse: (response: IGenericResponse<ProductListType>) => response.data,
      providesTags: (result) =>
        result?.productList
          ? [
              ...result.productList.map((value) => ({
                type: 'RecommendProduct' as const,
                id: value.productId,
              })),
            ]
          : [{ type: 'RecommendProduct' as const, id: 'LIST' }],
    }),
    likeProduct: builder.mutation<IGenericResponse<void>, number>({
      query: (productId) => {
        return {
          url: '/likes',
          method: 'POST',
          body: {
            productId,
          },
        };
      },
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productApiSlice.util.updateQueryData('getProductDetail', productId, (draft) => {
            const isLiked = !draft.isLiked;
            const likes = isLiked ? draft.likes + 1 : draft.likes - 1;
            const newProductDetail = { ...draft, likes, isLiked };
            Object.assign(draft, newProductDetail);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, args) => [
        { type: 'Product', id: args },
        { type: 'ProductDetail', id: args },
        {
          type: 'RecommendProduct',
          id: args,
        },
      ],
    }),
  }),
});

export const {
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetProductDetailQuery,
  useGetRecommendProductQuery,
  useLazyGetRecommendProductQuery,
  useLikeProductMutation,
} = productApiSlice;
