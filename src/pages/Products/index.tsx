import { useRef, useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';

import ProductSearchModal from '@/pages/Products/components/Search/modal';
import Layout from '@/components/layout/Layout';

import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';

import { useAppSelector } from '@/store/config';
import { getCurrentFilters } from '@/store/slices/productsSlice';
import Header from '@/components/layout/Header';
import { Spinner } from '@/Animation';

import FilterModal from './components/Filter/FilterModal';
import ProductList from './components/ProductList/ProductList';
import useFetchProductData from './hooks/useFetchProductData';
import useSearchKeyword from './hooks/useSearchKeyword';
import useFilterSheet from './hooks/useFilterSheet';
import SearchHeader from './components/Search/header';
import Tabs from './components/CategoryTabs';
import Submenus from './components/Submenus';

type locationStateType = {
  openSearch?: boolean;
};

export default function ProductsPage() {
  const filters = useAppSelector(getCurrentFilters);
  const location = useLocation();

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px 0px 0px 0px',
  });
  const { products, isError, isLastData, clearProducts } = useFetchProductData(inView);
  const { filterModal, openFilterModal, closeFilterModal } = useFilterSheet();
  const { search, searchKeyword, clearSearch, isOnSearch, openSearchInput, onChangeSearchKeyword } =
    useSearchKeyword();

  const hasAafco = typeof filters.aafco === 'boolean';
  const hasBrands = !!(Array.isArray(filters.brands) && filters.brands.length > 0);
  const hasIngredient = !!(Array.isArray(filters.ingredient) && filters.ingredient.length > 0);
  const hasAllergyIngredient = !!(
    Array.isArray(filters.allergyIngredient) && filters.allergyIngredient.length > 0
  );
  const hasFilter = hasAafco || hasBrands || hasIngredient || hasAllergyIngredient;
  const ref = useRef();
  const setRefs = useCallback(
    (node: any) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  useEffect(() => {
    if (!location.state) {
      return;
    }
    const { openSearch = false } = location.state as locationStateType;
    if (!openSearch) {
      return;
    }
    setSearchOpen(true);
    openSearchInput();
  }, [location.state]);

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <Layout footer header={false} title="제품목록">
      {isOnSearch || !!searchKeyword ? (
        <SearchHeader
          goBack={clearSearch}
          onClickSearch={search}
          searchKeyword={searchKeyword}
          setSearchInputValue={onChangeSearchKeyword}
          onFocus={searchOpen}
        />
      ) : (
        <Header
          title="제품목록"
          customRightChild={
            <div className="absolute right-0 flex items-center" onClick={openSearchInput}>
              <SearchIcon />
            </div>
          }
        />
      )}

      {isOnSearch && (
        <ProductSearchModal
          onClose={clearSearch}
          onClickSearch={search}
          searchKeyword={searchKeyword}
          setSearchInputValue={onChangeSearchKeyword}
        />
      )}
      <div className="flex flex-col w-full max-w-full mx-auto h-full relative mt-[50px]">
        <div className="flex flex-col w-full max-w-full px-3 fixed top-[50px] bg-transparent">
          <div className="shadow-max rounded">
            <Tabs />
            <Submenus hasFilter={hasFilter} openFilterModal={openFilterModal} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto mt-[80px]">
          {isLoading && <Spinner />}
          <ProductList ref={setRefs} products={products} error={isError} isLastPage={isLastData} />
        </div>
      </div>
      {filterModal && <FilterModal close={closeFilterModal} clearFilters={clearProducts} />}
    </Layout>
  );
}
