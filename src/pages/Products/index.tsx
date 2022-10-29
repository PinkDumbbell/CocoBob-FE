import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import ProductSearchModal from '@/pages/Products/components/Search/modal';
import Layout from '@/components/layout/Layout';

import { useToastMessage } from '@/utils/hooks';
import { useLazyGetProductQuery } from '@/store/api/productApi';
import { ProductPreviewType } from '@/@type/product';

import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { ReactComponent as FilterIcon } from '@/assets/icon/filter_icon.svg';

import CategoryTabButton from './components/CategoryTabButton';
import FilterModal from './components/Filter/FilterModal';
import ProductList from './components/ProductList/ProductList';

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

export default function ProductsPage() {
  const openToast = useToastMessage();
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
  const setRefs = useCallback(
    (node: any) => {
      ref.current = node;
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

  const hanldeCategoryChange = (selectedCategory: CategoryType) => {
    if (selectedCategory !== '사료') {
      openToast('열심히 준비 중이에요!', 'success');
      return;
    }

    setCategory(selectedCategory);
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
                onClick={() => hanldeCategoryChange(categoryName)}
                isOn={category === categoryName}
              />
            ))}
          </div>
          <div className="w-full px-3 py-1 border-t border-b border-gray-200 flex items-center justify-between">
            <div className="flex gap-3 h-7">
              <button
                className="rounded-lg border px-4 flex items-center gap-1 text-xs"
                onClick={openFilterModal}
              >
                <FilterIcon className="h-5" />
                <span>필터</span>
              </button>
              {(filters?.aafco || searchKeyword) && (
                <button
                  className="px-2 rounded-[10px] border border-gray-700"
                  onClick={() => setSearchParams(initFilters)}
                >
                  초기화
                </button>
              )}
            </div>
          </div>
        </div>
        <ProductList
          ref={setRefs}
          products={searchResults}
          error={isError}
          isLastPage={isLastData}
        />
      </div>
      {filterModal && <FilterModal close={closeFilterModal} />}
    </Layout>
  );
}
