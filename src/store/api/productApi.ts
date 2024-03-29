import {
  ProductType,
  ProductListType,
  SearchFilterType,
  IRelatedProduct,
  RelatedProductType,
} from '@/@type/product';
import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

function getQueryStringFromIter(iter: string[]) {
  return iter.join(',');
}
function addParams(
  map: Map<string, string | boolean | number>,
  key: string,
  values: Array<string> | string | number | boolean,
) {
  if (!values) {
    return;
  }

  if (typeof values === 'string' || typeof values === 'boolean' || typeof values === 'number') {
    map.set(key, values);
  } else if (Array.isArray(values) && values.length > 0) {
    map.set(key, getQueryStringFromIter(values));
  }
}
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<ProductListType, SearchFilterType>({
      query: ({ page, size, ...args }) => {
        const paramsMap = new Map();
        Object.entries(args).forEach(([key, value]) => {
          addParams(paramsMap, key, value);
        });

        const params = Object.fromEntries(paramsMap);

        return {
          url: '/v2/products/search',
          params: { page, size: size ?? 20, ...params },
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
      query: (id) => `/v1/products/${id}`,
      transformResponse: (response: IGenericResponse<ProductType>) => response.data,
      providesTags: (result) => [{ type: 'ProductDetail', id: result?.productId }],
    }),
    getRecommendProduct: builder.query<
      ProductListType,
      { petId?: number; type: 'aged' | 'pregnancy' }
    >({
      query: ({ petId, type }) => `/v1/products/recommendation/${type}?petId=${petId}`,
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
    getRelatedProduct: builder.query<RelatedProductType, number>({
      query: (productId) => `v2/related-product?productId=${productId}`,
      transformResponse: (response: IGenericResponse<RelatedProductType>) => response.data,
    }),
    likeProduct: builder.mutation<IGenericResponse<void>, number>({
      query: (productId) => {
        return {
          url: '/v1/likes',
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
    getRelatedProductWithKeyword: builder.query<IRelatedProduct[], string>({
      query: (keyword) => `/v1/products/keyword?keyword=${keyword}`,
      transformResponse: (response: IGenericResponse<IRelatedProduct[]>) => response.data,
    }),
  }),
});

export const {
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetProductDetailQuery,
  useGetRecommendProductQuery,
  useLazyGetRecommendProductQuery,
  useGetRelatedProductWithKeywordQuery,
  useLikeProductMutation,
  useGetRelatedProductQuery,
} = productApiSlice;
