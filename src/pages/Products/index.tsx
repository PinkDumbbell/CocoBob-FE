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
const categoryList: CategoryType[] = ['사료', '간식', '영양제'];

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
  const firstTrigger = useRef(false);
  const ref = useRef<HTMLDivElement>();

  const [category, setCategory] = useState<CategoryType>('사료');
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState<number>(0);
  const [filters, setFilters] = useState<any>({ aafco: false });
  const [searchResults, setSearchResults] = useState<ProductPreviewType[]>([]);

  const { ref: inViewRef, inView } = useInView({ threshold: 0, rootMargin: '150px 0px 0px 0px' });
  const [searchParams, setSearchParams] = useSearchParams();
  const [trigger, { isFetching, data, isSuccess }] = useLazyGetProductQuery();
  const { filterModal, openFilterModal, closeFilterModal } = useFilterModal();

  const setInViewRef = useCallback(
    (node: HTMLDivElement) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  const combineList = (nextList: ProductPreviewType[]) => (prevList: ProductPreviewType[]) =>
    prevList.concat(nextList);

  const showAllProducts = () => {
    setOnSearch(false);
    setSearchParams({ aafco: false });
  };

  const onClickSearch = () => setSearchParams({ ...searchParams, name: searchKeyword });

  useEffect(() => {
    setPage(0);
    firstTrigger.current = true;
    setSearchResults([]);
    setSearchKeyword('');
    if (searchParams.toString().length === 0) {
      setFilters({ aafco: false });
      trigger({ page: 0 });
      return;
    }

    const entries = searchParams.entries();
    const newFilters = Array.from(entries).reduce((filterObject, [key, value]) => {
      if (key === 'name') setSearchKeyword(value);
      return { ...filterObject, [key]: key === 'aafco' ? value === 'true' : value };
    }, {});

    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    if (!firstTrigger.current) return;
    if (isFetching) return;
    setPage(0);
    trigger({ ...filters, page: 0 });
  }, [filters]);

  useEffect(() => {
    if (!firstTrigger.current) return;
    if (isFetching || data?.last || !inView) return;
    trigger({ ...filters, page: page + 1 });
    setPage((prevState) => prevState + 1);
  }, [inView, isFetching, data]);

  useEffect(() => {
    if (!isSuccess) return;
    const productList = data?.productList ?? [];
    setSearchResults(combineList(productList));
  }, [data]);

  return (
    <Layout footer>
      {onSearch && (
        <ProductSearchModal
          onClose={() => showAllProducts()}
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
                  onClick={() => setSearchParams({ aafco: false })}
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
                    aafco: checked,
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
          {!isFetching && !data?.last && (
            <div ref={setInViewRef} className="w-full h-20 flex items-center justify-center">
              LoadMore
            </div>
          )}
        </div>
        {isFetching && <p>로딩중</p>}
      </div>
      {filterModal && <FilterModal setPage={setPage} close={closeFilterModal} />}
    </Layout>
  );
}
