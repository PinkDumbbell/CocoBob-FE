import { useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

import ProductSearchModal from '@/pages/Products/components/Search/modal';
import Layout from '@/components/layout/Layout';
import { useToastMessage } from '@/utils/hooks';

import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { ReactComponent as FilterIcon } from '@/assets/icon/filter_icon.svg';
import { ReactComponent as ResetIcon } from '@/assets/icon/refresh_icon.svg';

import { useAppDispatch, useAppSelector } from '@/store/config';
import { getCurrentFilters, resetFilter } from '@/store/slices/productsSlice';
import { Spinner } from '@/Animation';
import CategoryTabButton from './components/CategoryTabButton';
import FilterModal from './components/Filter/FilterModal';
import ProductList from './components/ProductList/ProductList';

import useFetchProductData from './hooks/useFetchProductData';
import useSearchKeyword from './hooks/useSearchKeyword';
import useFilterSheet from './hooks/useFilterSheet';

type CategoryType = '사료' | '간식' | '영양제';

const categoryList: CategoryType[] = ['사료', '간식', '영양제'];

const useTab = () => {
  const openToast = useToastMessage();
  const [category, setCategory] = useState<CategoryType>('사료');
  const hanldeCategoryChange = (selectedCategory: CategoryType) => {
    if (selectedCategory !== '사료') {
      openToast('열심히 준비 중이에요!', 'success');
      return;
    }

    setCategory(selectedCategory);
  };

  return {
    category,
    hanldeCategoryChange,
  };
};

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getCurrentFilters);

  const { category, hanldeCategoryChange } = useTab();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px 0px 0px 0px',
  });
  const { products, isError, isLastData, clearProducts } = useFetchProductData(inView);
  const { filterModal, openFilterModal, closeFilterModal } = useFilterSheet();
  const { searchKeyword, search, clearSearch, isOnSearch, openSearchInput, onChangeSearchKeyword } =
    useSearchKeyword();

  const ref = useRef();
  const setRefs = useCallback(
    (node: any) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  const hasAafco = typeof filters.aafco === 'boolean';
  const hasBrands = !!(Array.isArray(filters.brands) && filters.brands.length > 0);
  const hasIngredient = !!(Array.isArray(filters.ingredient) && filters.ingredient.length > 0);
  const hasAllergyIngredient = !!(
    Array.isArray(filters.allergyIngredient) && filters.allergyIngredient.length > 0
  );
  const hasFilter = hasAafco || hasBrands || hasIngredient || hasAllergyIngredient;

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <Layout
      footer
      header={!isOnSearch}
      title="제품목록"
      customRightChild={
        <div className="absolute right-4 flex items-center" onClick={openSearchInput}>
          <SearchIcon />
        </div>
      }
    >
      {isOnSearch && (
        <ProductSearchModal
          onClose={clearSearch}
          onClickSearch={search}
          searchInputValue={searchKeyword}
          onChangeKeyword={onChangeSearchKeyword}
        />
      )}
      <div className="flex flex-col w-full max-w-full mx-auto h-full relative">
        <div className="flex flex-col w-full max-w-full bg-white">
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
          <div className="w-full px-3 py-1 border-t border-b border-secondary-brightest flex items-center justify-between">
            <div className="text-caption flex gap-3 h-7 w-full">
              <button
                className="rounded-sm text-black border border-secondary-brightest w-20 h-full flex items-center gap-1 text-xs justify-center"
                onClick={openFilterModal}
              >
                <FilterIcon className="h-5" />
                <span>필터</span>
              </button>
              {hasFilter && (
                <button
                  className="rounded-full text-black border border-secondary-brightest w-20 h-full flex items-center gap-1 text-xs justify-center"
                  onClick={() => {
                    dispatch(resetFilter());
                  }}
                >
                  <ResetIcon className="h-4" />
                  <span>초기화</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {isLoading && <Spinner />}
          <ProductList ref={setRefs} products={products} error={isError} isLastPage={isLastData} />
        </div>
      </div>
      {filterModal && <FilterModal close={closeFilterModal} clearFilters={clearProducts} />}
    </Layout>
  );
}
