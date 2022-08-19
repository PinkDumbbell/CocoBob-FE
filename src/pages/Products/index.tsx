import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Product';
import { useLazyGetProductQuery } from '@/store/api/productApi';
import { concatClasses } from '@/utils/libs/concatClasses';
import { IProduct } from '@/@type/product';
import Header from './components/Header';
import SearchPage from './components/Search';
import SearchHeader from './components/Search/header';

import CategoryTabButton from './components/CategoryTabButton';

const MainContent = {
  AllProducts: 'AllProducts',
  Search: 'Search',
  SearchResults: 'SearchResults',
  OnlySearch: 'OnlySearch',
} as const;

type MainContentType = typeof MainContent[keyof typeof MainContent]; // 'AllProducts' | 'Search' | 'SearchResults' | 'OnlySearch'
interface LocationState {
  MainContent: MainContentType;
}

type CategoryType = '사료' | '간식' | '영양제';
const categoryList: CategoryType[] = ['사료', '간식', '영양제'];

interface IFilter {
  name?: string;
  aafco?: boolean;
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state = useLocation().state as LocationState;
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>('사료');
  const [mainContent, setMainContent] = useState<MainContentType>('AllProducts');

  const ref = useRef<HTMLDivElement>();
  const { ref: inViewRef, inView } = useInView({ threshold: 0, rootMargin: '150px' });

  const [page, setPage] = useState<number>(0);
  const [filters, setFilters] = useState<IFilter>({
    name: '',
    aafco: false,
  });
  const [trigger, { isLoading, data, isSuccess }] = useLazyGetProductQuery();
  const [productList, setProductList] = useState<IProduct[]>([]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);

  const setInViewRef = useCallback(
    (node: HTMLDivElement) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  const showAllProducts = () => {
    setSearchKeyword('');
    if (mainContent === 'OnlySearch') navigate(-1);
    else {
      setPage(0);
      setFilters({ name: '' });
      setMainContent('AllProducts');
      setSearchParams({});
    }
  };

  const onClickSearch = () => {
    setPage(0);
    setProductList([]);
    setSearchResults([]);
    if (searchKeyword === '') setMainContent('AllProducts');
    else setMainContent('SearchResults');
    setSearchParams({ ...searchParams, name: searchKeyword });
  };

  useEffect(() => {
    console.log('useEffect []');
    if (!state) return;
    setPage(0);

    const { MainContent: MainContentState } = state;
    if (state) setMainContent(MainContentState);
  }, []);

  useEffect(() => {
    console.log('useEffect [searchParams]');
    const nameParam = searchParams.get('name');
    const aafcoParam = searchParams.get('aafco');
    console.log('name, aafco', nameParam, aafcoParam);
    if (nameParam) {
      setSearchKeyword(nameParam);
      setFilters((currentFilter) => ({
        ...currentFilter,
        name: nameParam ?? '',
      }));
    }
    if (aafcoParam) {
      setFilters((currentFilter) => ({ ...currentFilter, aafco: aafcoParam === 'true' }));
    }

    if (nameParam || aafcoParam) setMainContent('SearchResults');
    else setMainContent('AllProducts');
    setPage(0);

    trigger({
      aafco: aafcoParam === null ? undefined : aafcoParam === 'true',
      name: nameParam ?? '',
      page,
    });
  }, [searchParams]);

  useEffect(() => {
    console.log('useEffect [searchKeyword]');
    if (filters.name === searchKeyword || mainContent === 'AllProducts') return;
    setSearchResults([]);
    setMainContent('Search');
  }, [searchKeyword]);

  useEffect(() => {
    console.log('useEffect [inView, isLoading]');
    if (!data?.last && inView) {
      trigger({ name: filters.name, page });
    }
  }, [inView, isLoading]);

  useEffect(() => {
    console.log('useEffect [data, isSuccess]');
    if (!isSuccess) return;

    const setter = (prevList: IProduct[]) => [...prevList, ...(data?.productList ?? [])];
    if (mainContent === 'AllProducts') setProductList(setter);
    else setSearchResults(setter);
    setPage((prevState) => prevState + 1);
  }, [data, isSuccess]);

  return (
    <Layout footer>
      <div className="fixed top-0 left-0 right-0 mx-auto flex flex-col w-full max-w-[425px]">
        {mainContent === 'AllProducts' ? (
          <Header title={'제품목록'} goSearchPage={() => setMainContent('Search')} />
        ) : (
          <SearchHeader
            setSearchInputValue={(word: string) => setSearchKeyword(word)}
            searchInputValue={searchKeyword}
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
            <div className="w-full px-3 h-8 border-t border-b border-gray-200 flex items-center justify-end">
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
              <div
                key={product.productId}
                className="px-2"
                onClick={() => navigate(`/products/${product.productId}`)}
              >
                <ProductItem product={product} />
              </div>
            ))}
            {!isLoading && !data?.last && (
              <div ref={setInViewRef} className="w-full h-20 flex items-center justify-center">
                LoadMore
              </div>
            )}
          </div>
        )}
        {(mainContent === 'Search' || mainContent === 'OnlySearch') && (
          <SearchPage onClickSearch={onClickSearch} searchKeyword={searchKeyword} />
        )}
        {isLoading && <p>로딩중</p>}{' '}
      </div>
    </Layout>
  );
}
