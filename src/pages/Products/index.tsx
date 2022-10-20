import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Product';
import ProductSearchModal from '@/pages/Products/components/Search/modal';
import { useLazyGetProductQuery } from '@/store/api/productApi';
import { ProductPreviewType } from '@/@type/product';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';

import CategoryTabButton from './components/CategoryTabButton';
import FilterModal from './components/Filter/FilterModal';

type CategoryType = '사료' | '간식' | '영양제';
type FilterType = {
  aafco?: boolean;
  [key: string]: any;
};
const categoryList: CategoryType[] = ['사료', '간식', '영양제'];
const initFilters: FilterType = { aafco: false };
const isAafco = (key: string) => key === 'aafco';
const combineList = (nextList: ProductPreviewType[]) => (prevList: ProductPreviewType[]) =>
  prevList.concat(nextList);

function useSelectFilters() {
  const [filters, setFilters] = useState<FilterType>(initFilters);

  const handleInitFilters = () => setFilters(initFilters);

  const handleSetFilters = (filterOption: FilterType) => setFilters(filterOption);

  return {
    filters,
    handleSetFilters,
    handleInitFilters,
  };
}
function useFilterModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openFilterModal = () => {
    setIsOpen(true);
  };
  const closeFilterModal = () => {
    setIsOpen(false);
  };

  return {
    filterModal: isOpen,
    openFilterModal,
    closeFilterModal,
  };
}
function useFetchProductData(filters: FilterType, inView: boolean) {
  const [page, setPage] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<ProductPreviewType[]>([]);
  const [trigger, { isFetching, isLoading, data, isSuccess, isError }] = useLazyGetProductQuery();

  const handleInitResult = () => {
    setPage(0);
    setSearchResults([]);
  };

  const handleIncreasePage = () => {
    trigger({ ...filters, page: page + 1 });
    setPage((prevState) => prevState + 1);
  };

  const isLastData = data?.last;

  useEffect(() => {
    if (isFetching) return;
    setPage(0);
    trigger({ ...filters, page: 0 });
  }, [filters]);

  useEffect(() => {
    if (isLoading || data?.last || !inView) return;
    handleIncreasePage();
  }, [inView, isLoading, data]);
  useEffect(() => {
    if (page === 0) return;
    trigger({ ...filters, page: page + 1 });
  }, [page]);
  useEffect(() => {
    if (!isSuccess) return;
    const productList = data?.productList ?? [];
    setSearchResults(combineList(productList));
  }, [data]);

  return {
    searchResults,
    isFetching,
    isError,
    isLastData,
    handleInitResult,
  };
}

const ProductListItem = React.forwardRef(
  ({ product }: { product: ProductPreviewType }, ref: React.Ref<HTMLDivElement>) => {
    const navigate = useNavigate();
    return (
      <div ref={ref} className="px-2" onClick={() => navigate(`/products/${product.productId}`)}>
        <ProductItem product={product} />
      </div>
    );
  },
);
ProductListItem.displayName = 'MemoizedProductItem';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>('사료');
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, handleInitFilters, handleSetFilters } = useSelectFilters();
  const { filterModal, openFilterModal, closeFilterModal } = useFilterModal();

  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px 0px 0px 0px',
  });
  const ref = useRef();
  // Use `useCallback` so we don't recreate the function on each render
  const setRefs = useCallback(
    (node: any) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef],
  );

  const { searchResults, isError, isLastData, handleInitResult } = useFetchProductData(
    filters,
    inView,
  );

  const handleCloseSearch = () => {
    setOnSearch(false);
    setSearchParams(initFilters);
  };

  const onClickSearch = (keyword?: string) => {
    setSearchParams({ ...searchParams, keyword: keyword ?? searchKeyword });
    setOnSearch(false);
  };

  useEffect(() => {
    handleInitResult();
    setSearchKeyword('');
    if (searchParams.toString().length === 0) {
      handleInitFilters();
      return;
    }

    const entries = searchParams.entries();
    const newFilters = Array.from(entries).reduce((filterObject, [key, value]) => {
      if (key === 'name') setSearchKeyword(value);
      const filterValue = isAafco(key) ? value === 'true' : value;
      return { ...filterObject, [key]: filterValue };
    }, {});

    handleSetFilters(newFilters);
  }, [searchParams]);

  return (
    <Layout
      footer
      header={!onSearch}
      title="제품목록"
      customRightChild={
        <div className="absolute right-4 flex items-center" onClick={() => setOnSearch(true)}>
          <SearchIcon />
        </div>
      }
    >
      {onSearch && (
        <ProductSearchModal
          onClose={handleCloseSearch}
          onClickSearch={onClickSearch}
          searchInputValue={searchKeyword}
          setSearchInputValue={setSearchKeyword}
        />
      )}
      <div className="flex flex-col w-full max-w-[425px] mx-auto h-full relative">
        <div className="flex flex-col w-full max-w-[425px] bg-white">
          <div className="h-12 w-full flex justify-between items-center">
            {categoryList.map((categoryName) => (
              <CategoryTabButton
                key={categoryName}
                name={categoryName}
                onClick={() => setCategory(categoryName)}
                isOn={category === categoryName}
              />
            ))}
          </div>
          <div className="w-full px-3 py-1 border-t border-b border-gray-200 flex items-center justify-between">
            <div className="flex gap-3">
              <button className="rounded-lg border border-gray-700 px-4" onClick={openFilterModal}>
                필터
              </button>
              {(filters?.aafco || searchKeyword) && (
                <button
                  className="px-2 rounded-[10px] border border-gray-700"
                  onClick={() => setSearchParams(initFilters)}
                >
                  reset
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="aafco-filter" className="text-gray-700 text-[0.8rem]">
                AAFCO 만족 상품
              </label>
              <input
                type="checkbox"
                name=""
                id="aafco-filter"
                checked={filters?.aafco}
                onChange={({ target: { checked } }) =>
                  setSearchParams({
                    ...searchParams,
                    name: searchKeyword,
                    aafco: String(checked),
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {searchResults?.map((product, idx, arr) => (
            <ProductListItem
              product={product}
              key={product.productId}
              ref={idx === arr.length - 10 ? setRefs : null}
            />
          ))}
          {isLastData && searchResults.length === 0 && (
            <div className="flex items-center justify-center w-full h-20">
              검색 결과가 없습니다. 다른 상품을 검색해보세요
            </div>
          )}
        </div>

        {isError && (
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col items-center justify-center gap-2">
              <h3>에러 발생</h3>
              <p>잠시 후 다시 시도해주세요.</p>
            </div>
            <button
              type="button"
              className="bg-primary-bright text-white rounded-[10px] px-4 py-2"
              onClick={() => navigate(0)}
            >
              새로고침
            </button>
          </div>
        )}
      </div>
      {filterModal && <FilterModal close={closeFilterModal} />}
    </Layout>
  );
}
