import { forwardRef, Ref, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductPreviewType } from '@/@type/product';

import ProductListItem from './ProductListItem';

type ProductListProps = {
  products: ProductPreviewType[];
  isLastPage?: boolean;
  error: boolean;
};

const ProductList = forwardRef(
  ({ products, isLastPage, error }: ProductListProps, loadRef: Ref<HTMLDivElement>) => {
    const navigate = useNavigate();
    const refreshPage = useCallback(() => navigate(0), []);

    return (
      <>
        <div className="flex-1 overflow-y-auto">
          {products?.map((product, idx, arr) => (
            <ProductListItem
              product={product}
              key={product.productId}
              ref={idx === arr.length - 10 ? loadRef : null}
            />
          ))}
          {isLastPage && products.length === 0 && (
            <div className="flex items-center justify-center w-full h-20">
              검색 결과가 없습니다. 다른 상품을 검색해보세요
            </div>
          )}
        </div>

        {error && (
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col items-center justify-center gap-2">
              <h3>에러 발생</h3>
              <p>잠시 후 다시 시도해주세요.</p>
            </div>
            <button
              type="button"
              className="bg-primary-bright text-white rounded-[10px] px-4 py-2"
              onClick={refreshPage}
            >
              새로고침
            </button>
          </div>
        )}
      </>
    );
  },
);
ProductList.displayName = 'ProductList';
export default ProductList;
