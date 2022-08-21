import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Product';
import { useLazyGetProductQuery } from '@/store/api/productApi';
import { concatClasses } from '@/utils/libs/concatClasses';
import { ProductPreviewType } from '@/@type/product';
import { ReactComponent as CloseIcon } from '@/assets/icon/close_icon.svg';
import { ReactComponent as CheckIcon } from '@/assets/icon/check_icon.svg';
import Header from './components/Header';
import SearchPage from './components/Search';
import SearchHeader from './components/Search/header';

import CategoryTabButton from './components/CategoryTabButton';

const MainContent = {
  AllProducts: 'AllProducts',
  Search: 'Search',
  SearchResults: 'SearchResults',
  OnlySearch: 'OnlySearch', // todo: 네이밍 좀 더 명확하게
} as const;

type MainContentType = typeof MainContent[keyof typeof MainContent]; // 'AllProducts' | 'Search' | 'SearchResults' | 'OnlySearch'
// interface LocationState {
//   MainContent: MainContentType;
// }

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

function FilterModal({ close, saveFilter }: { close: () => void; saveFilter: () => void }) {
  const onClickSaveFilter = () => {
    saveFilter();
    close();
  };
  return (
    <div className="fixed bottom-0 z-[9000] w-full max-w-[425px] h-3/4 rounded-t-[10px] bg-white shadow-sm">
      <div className="flex flex-col w-full h-full p-2">
        <div className="flex items-center justify-between p-1 h-10 border-b boder-b-gray-800">
          <button onClick={close}>
            <CloseIcon />
          </button>
          <button onClick={onClickSaveFilter}>
            <CheckIcon />
          </button>
        </div>
      </div>
    </div>
  );
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>('사료');
  const [mainContent, setMainContent] = useState<MainContentType>('AllProducts');

  const ref = useRef<HTMLDivElement>();
  const { ref: inViewRef, inView } = useInView({ threshold: 0, rootMargin: '150px 0px 0px 0px' });
  const [searchInputValue, setSearchInputValue] = useState('');

  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [sort, setSort] = useState();
  const [filters, setFilters] = useState<any>([]);
  const [trigger, { isFetching, data, isSuccess }] = useLazyGetProductQuery();
  const [productList, setProductList] = useState<ProductPreviewType[]>([]);
  const [searchResults, setSearchResults] = useState<ProductPreviewType[]>([]);

  const { filterModal, openFilterModal, closeFilterModal } = useFilterModal();

  const setInViewRef = useCallback(
    (node: HTMLDivElement) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  const showAllProducts = () => {
    if (mainContent === 'OnlySearch') navigate(-1);
    else {
      setMainContent('AllProducts');
      setSearchParams({});
    }
  };

  const onClickSearch = () => {
    setSearchParams({ ...searchParams, name: searchInputValue });
  };

  useEffect(() => {
    setSearchResults([]);
    setProductList([]);

    const newFilters: { [key: string]: string } = {};
    const entries = searchParams.entries();
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of entries) {
      const [key, value] = entry;
      if (mainContent !== 'SearchResults') setMainContent('SearchResults');
      newFilters[key] = value;
    }
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    if (isFetching) return;
    setPage(0);
    trigger({ ...filters, page: 0 });
  }, [filters]);

  useEffect(() => {
    if (!isFetching && !data?.last && inView) {
      trigger({ ...filters, page: page + 1 });
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isFetching, data]);

  const setter = useCallback(
    (prevList: ProductPreviewType[]) => {
      const newList = prevList.concat(data?.productList ?? []);
      return newList;
    },
    [data?.productList],
  );
  useEffect(() => {
    if (!isSuccess) return;

    if (mainContent === 'AllProducts') setProductList(setter);
    else {
      setSearchResults(setter);
    }
  }, [data]);

  return (
    <Layout footer>
      <div className="fixed top-0 left-0 right-0 mx-auto flex flex-col w-full max-w-[425px]">
        {mainContent === 'AllProducts' ? (
          <Header title={'제품목록'} goSearchPage={() => setMainContent('Search')} />
        ) : (
          <SearchHeader
            searchInputValue={searchInputValue}
            setSearchInputValue={setSearchInputValue}
            onClickSearch={onClickSearch}
            setMainContent={setMainContent}
            goBack={showAllProducts}
          />
        )}
        {mainContent !== 'Search' && mainContent !== 'OnlySearch' && (
          <div
            className={concatClasses(
              'flex flex-col w-full max-w-[425px] bg-white',
              mainContent !== 'SearchResults' ? 'pt-[50px]' : '',
            )}
          >
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
              <div>
                <button
                  className="rounded-lg border border-gray-700 px-4"
                  onClick={openFilterModal}
                >
                  필터
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="aafco-filter" className="text-gray-700 text-[0.8rem]">
                  AAFCO 만족 상품
                </label>
                <input type="checkbox" name="" id="aafco-filter" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-full">
        {mainContent !== 'Search' && mainContent !== 'OnlySearch' && (
          <div className="pt-[150px] pb-[60px]">
            {(mainContent === 'AllProducts' ? productList : searchResults)?.map((product) => (
              <MemoizedProductItem key={product.productId} product={product} />
            ))}
            {!isFetching && !data?.last && (
              <div ref={setInViewRef} className="w-full h-20 flex items-center justify-center">
                LoadMore
              </div>
            )}
          </div>
        )}
        {(mainContent === 'Search' || mainContent === 'OnlySearch') && (
          <SearchPage searchInputValue={searchInputValue} onClickSearch={onClickSearch} />
        )}
        {isFetching && <p>로딩중</p>}
        {filterModal && (
          <FilterModal
            close={closeFilterModal}
            saveFilter={() => setSearchParams({ ...searchParams, name })}
          />
        )}
      </div>
    </Layout>
  );
}
