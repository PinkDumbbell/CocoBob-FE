import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import Layout from '@/components/layout/Layout';
import { HeaderContents, HeaderWrapper, Title } from '@/components/layout/Header.style';
import ProductItem from '@/components/Product';

import { useGetProductQuery } from '@/store/api/productApi';
import { concatClasses } from '@/utils/libs/concatClasses';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { IProduct } from '@/@type/product';
import SearchHeader from './components/Search/header';
import SearchPage from './components/Search';

const MainContent = {
  AllProducts: 'AllProducts',
  Search: 'Search',
  SearchProducts: 'SearchProducts',
  OnlySearch: 'OnlySearch',
} as const;

type MainContentType = typeof MainContent[keyof typeof MainContent]; // 'AllProducts' | 'Search' | 'SearchProducts' | 'OnlySearch'
interface LocationState {
  MainContent: MainContentType;
}

type CategoryType = '사료' | '간식' | '영양제';
const categoryList: CategoryType[] = ['사료', '간식', '영양제'];

export default function ProductsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>('사료');
  const [mainContent, setMainContent] = useState<MainContentType>('AllProducts');

  const ref = useRef<HTMLDivElement>();
  const { ref: inViewRef, inView } = useInView({ rootMargin: '100px 0px 0px 0px', threshold: 0 });
  const [page, setPage] = useState<number>(0);
  const { data, isLoading } = useGetProductQuery({ page });
  const [productList, setProductList] = useState<IProduct[]>([]);

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[] | undefined>([]);

  const setInViewRef = useCallback(
    (node: HTMLDivElement) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );
  const getProducts = useCallback(() => {
    setProductList((prev) => [...prev, ...(data?.productList || [])]);
  }, [data]);

  const goBack = () => {
    setSearchKeyword('');
    if (mainContent === 'OnlySearch') navigate(-1);
    else setMainContent('AllProducts');
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (inView && !isLoading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLoading]);

  const onClickSearch = (name?: string) => {
    if (searchKeyword === '') setMainContent('AllProducts');
    else if (name) {
      // api요청 추가
      setSearchKeyword(name);
      setSearchResults(productList);
      setMainContent('SearchProducts');
    } else {
      // searchWord로 api 요청
      setSearchResults(productList);
      setMainContent('SearchProducts');
    }
  };
  useEffect(() => {
    if (mainContent === 'SearchProducts' || mainContent === 'AllProducts') return;
    setSearchResults([]);
    setMainContent('Search');
  }, [searchKeyword]);

  useEffect(() => {
    if (!state) return;
    const { MainContent: MainContentState } = state as LocationState;
    if (MainContentState) setMainContent(MainContentState);
  }, []);

  return (
    <Layout footer>
      <div className="fixed top-0 left-0 right-0 mx-auto flex flex-col w-full max-w-[425px]">
        {mainContent === 'AllProducts' ? (
          <HeaderWrapper>
            <HeaderContents>
              <Title isHide={false}>사료</Title>
              <div
                className="absolute right-4 flex items-center"
                onClick={() => {
                  setMainContent('Search');
                }}
              >
                <SearchIcon />
              </div>
            </HeaderContents>
          </HeaderWrapper>
        ) : (
          <SearchHeader
            setSearchWord={(word: string) => setSearchKeyword(word)}
            searchWord={searchKeyword}
            onClickSearch={onClickSearch}
            setMainContent={setMainContent}
            onClick={() => {
              goBack();
            }}
          />
        )}
        {mainContent !== 'Search' && mainContent !== 'OnlySearch' && (
          <div
            className={concatClasses(
              'flex flex-col w-full max-w-[425px] bg-white',
              mainContent !== 'SearchProducts' ? 'pt-[50px]' : '',
            )}
          >
            <div className="h-12 w-full flex justify-between items-center">
              {categoryList.map((categoryName) =>
                categoryName === category ? (
                  <button
                    key={categoryName}
                    className="flex justify-center items-center box-border h-12 flex-1 border-b border-red-500 text-red-500"
                    onClick={() => {
                      setCategory(categoryName);
                    }}
                  >
                    {categoryName}
                  </button>
                ) : (
                  <button
                    key={categoryName}
                    className="flex justify-center items-center flex-1"
                    onClick={() => {
                      setCategory(categoryName);
                    }}
                  >
                    {categoryName}
                  </button>
                ),
              )}
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
          <div className="mt-[150px]">
            {(mainContent === 'AllProducts' ? productList : searchResults)?.map((product) => (
              <div
                key={product.productId}
                className="px-2"
                onClick={() => navigate(`/products/${product.productId}`)}
              >
                <ProductItem product={product} />
              </div>
            ))}
            {!isLoading && (
              <div ref={setInViewRef} className="block w-full h-24">
                LoadMore
              </div>
            )}
          </div>
        )}
        {(mainContent === 'Search' || mainContent === 'OnlySearch') && (
          <SearchPage onClickSearch={onClickSearch} searchWord={searchKeyword} />
        )}

        {isLoading && <p>로딩중</p>}
      </div>
    </Layout>
  );
}
