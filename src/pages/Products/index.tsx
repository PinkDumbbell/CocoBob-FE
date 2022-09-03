import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Product';
import ProductSearchModal from '@/pages/Products/components/Search/modal';
import { useLazyGetProductQuery } from '@/store/api/productApi';
import { ProductPreviewType } from '@/@type/product';
import Header from './components/Header';

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
function useFetchProductData(filters: FilterType) {
  const ref = useRef<HTMLDivElement>();
  const [page, setPage] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<ProductPreviewType[]>([]);
  const [trigger, { isFetching, data, isSuccess, isError }] = useLazyGetProductQuery();
  const { ref: inViewRef, inView } = useInView({ threshold: 0, rootMargin: '150px 0px 0px 0px' });

  const setInViewRef = useCallback(
    (node: HTMLDivElement) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

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
    if (isFetching || data?.last || !inView) return;
    handleIncreasePage();
  }, [inView, isFetching, data]);

  useEffect(() => {
    if (!isSuccess) return;
    const productList = data?.productList ?? [];
    setSearchResults(combineList(productList));
  }, [data]);

  return { searchResults, isFetching, isError, isLastData, handleInitResult, setInViewRef };
}
const MemoizedProductItem = React.memo(({ product }: { product: ProductPreviewType }) => {
  const navigate = useNavigate();
  return (
    <div className="px-2" onClick={() => navigate(`/products/${product.productId}`)}>
      <ProductItem product={product} />
    </div>
  );
});
MemoizedProductItem.displayName = 'ProductItem';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>('사료');
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, handleInitFilters, handleSetFilters } = useSelectFilters();
  const { filterModal, openFilterModal, closeFilterModal } = useFilterModal();
  const { searchResults, isFetching, isError, isLastData, handleInitResult, setInViewRef } =
    useFetchProductData(filters);

  const handleCloseSearch = () => {
    setOnSearch(false);
    setSearchParams(initFilters);
  };
  const onClickSearch = () => setSearchParams({ ...searchParams, name: searchKeyword });

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
    <Layout footer>
      {onSearch && (
        <ProductSearchModal
          onClose={handleCloseSearch}
          onClickSearch={onClickSearch}
          searchInputValue={searchKeyword}
          setSearchInputValue={setSearchKeyword}
        />
      )}
      <div className="fixed top-0 left-0 right-0 mx-auto flex flex-col w-full max-w-[425px]">
        <Header title={'제품목록'} goSearchPage={() => setOnSearch(true)} />
        <div className={'flex flex-col w-full max-w-[425px] bg-white pt-[50px]'}>
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
      </div>
      <div className="w-full h-full">
        <div className="pt-[150px] pb-[60px]">
          {searchResults?.map((product) => (
            <MemoizedProductItem key={product.productId} product={product} />
          ))}
          {!isFetching && !isLastData && (
            <div ref={setInViewRef} className="w-full h-20 flex items-center justify-center">
              LoadMore
            </div>
          )}
        </div>
        {isFetching && <p>로딩중</p>}
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
