import { useState, useEffect } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';

import { DotLoader } from '@/Animation';

import useBottomSheet from '@/components/BottomSheet/hooks/useBottomSheet';
import Button from '@/components/Button';
import { FormInput } from '@/components/Form';

import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { useLazyGetProductQuery } from '@/store/api/productApi';
import { ProductPreviewType } from '@/@type/product';
import { concatClasses } from '@/utils/libs/concatClasses';

const SearchInput = ({ rules }: { rules: UseFormRegisterReturn }) => {
  return (
    <FormInput
      label=""
      name="search-product"
      rules={rules}
      unit={
        <button type="submit">
          <SearchIcon />
        </button>
      }
    />
  );
};

type SearchInputType = {
  keyword: string;
};

type FetchParamsType = {
  page: number;
  keyword: string;
};

function useProducts() {
  const { ref, inView } = useInView();
  const [fetchParams, setFetchParams] = useState<FetchParamsType>({
    keyword: '',
    page: 0,
  });
  const [fetchProduct, { data, isLoading }] = useLazyGetProductQuery();
  const [products, setProducts] = useState<ProductPreviewType[]>([]);
  const isLast = data?.last;

  const search = ({ keyword }: SearchInputType) => {
    const searchKeyword = keyword.trim();
    if (!searchKeyword) {
      return;
    }
    setFetchParams({
      keyword: searchKeyword,
      page: 0,
    });
  };

  useEffect(() => {
    if (!data?.productList) {
      return;
    }
    setProducts((prevValue) => prevValue.concat(data.productList));
  }, [data?.productList]);

  useEffect(() => {
    if (!fetchParams.keyword) {
      return;
    }
    fetchProduct(fetchParams);
  }, [fetchParams, isLast]);

  useEffect(() => {
    if (!inView || isLoading || isLast) {
      return;
    }
    setFetchParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [inView, isLoading, isLast]);

  return {
    ref,
    search,
    products,
    isLast,
  };
}

interface FeedBottomSheetProps {
  // eslint-disable-next-line
  onSelectProduct: (product: ProductPreviewType | string) => void;
}
export function FeedBottomSheetContent({ onSelectProduct }: FeedBottomSheetProps) {
  const { register, handleSubmit, getValues } = useForm<SearchInputType>();
  const [isSearched, setIsSearched] = useState(false);
  const { search, products, ref, isLast } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<ProductPreviewType | null>(null);

  const saveProductWithInputValue = () => {
    const keyword = getValues('keyword').trim();
    onSelectProduct(keyword);
  };

  const searchKeyword = (data: SearchInputType) => {
    search(data);
    setIsSearched(true);
  };

  return (
    <div className="relative flex flex-col items-center w-full px-3 max-h-[75vh] ">
      <form className="w-full" onSubmit={handleSubmit(searchKeyword)}>
        <SearchInput
          rules={register('keyword', {
            required: true,
          })}
        />
      </form>
      <div className="relative w-full py-2 overflow-y-auto min-h-sectionflex flex-col items-center justify-center">
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <div
                className={concatClasses(
                  'p-2 flex items-center gap-1 w-full cursor-pointer',
                  product.productId === selectedProduct?.productId ? 'bg-primary-max' : '',
                )}
                key={product.productId}
                onClick={() => {
                  setSelectedProduct(product);
                }}
              >
                <p className="text-primary whitespace-nowrap">{product.brand}</p>
                <p>{product.name}</p>
              </div>
            ))}
            {products.length > 0 && !isLast && (
              <div className="w-full h-20 flex justify-center items-center" ref={ref}>
                <DotLoader />
              </div>
            )}
          </>
        ) : (
          <p className="text-center py-main">
            {!isSearched ? '상품을 검색해보세요' : '검색 결과가 없습니다'}
          </p>
        )}
      </div>

      <div className="w-full py-2 flex flex-col gap-2">
        {isSearched && (
          <div className="flex items-center justify-center py-2">
            <button type="button" className="text-caption" onClick={saveProductWithInputValue}>
              현재 입력한 이름으로 등록할게요
            </button>
          </div>
        )}
        <Button
          label="선택"
          width="full"
          onClick={() => {
            if (!selectedProduct) {
              return;
            }
            onSelectProduct(selectedProduct);
          }}
        />
      </div>
    </div>
  );
}
export default function useFeedBottomSheet() {
  const { BottomSheet, closeBottomSheet, openBottomSheet } = useBottomSheet();

  const Component = ({ onSelectProduct }: FeedBottomSheetProps) => {
    return (
      <BottomSheet>
        <FeedBottomSheetContent onSelectProduct={onSelectProduct} />
      </BottomSheet>
    );
  };

  return {
    closeBottomSheet,
    openBottomSheet,
    Component,
  };
}
