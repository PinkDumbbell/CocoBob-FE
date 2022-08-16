import { HeaderContents, HeaderWrapper, Title } from '@/components/layout/Header.style';

import ProductItem from '@/components/Product';
import { useGetProductQuery } from '@/store/api/productApi';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { useEffect, useState } from 'react';
import Footer from '@/components/layout/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchPage from './components/Search';
import SearchHeader from './components/Search/header';

const MainContent = {
  AllProducts: 'AllProducts',
  Search: 'Search',
  SearchProducts: 'SearchProducts',
  OnlySearch: 'OnlySearch',
} as const;
type MainContentType = typeof MainContent[keyof typeof MainContent]; // 'AllProducts' | 'Search' | 'SearchProducts' | 'OnlySearch'
interface ILocation {
  MainContent: MainContentType;
}
export default function ProductsPage() {
  const categoryList = ['사료', '간식', '영양제'];
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState<string>('');
  const [mainContent, setMainContent] = useState<MainContentType>('AllProducts');
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchedData, setSearchedData] = useState<any[] | undefined>([]);
  // todo: 검색 가능한 키워드 선정하기
  const { data } = useGetProductQuery();
  const state = useLocation().state as ILocation;
  const productList = data?.productList;
  const navigate = useNavigate();

  const goBack = () => {
    setSearchWord('');
    if (mainContent === 'OnlySearch') navigate(-1);
    else setMainContent('AllProducts');
  };
  const onClickSearch = (name?: string) => {
    if (searchWord === '') setMainContent('AllProducts');
    else if (name) {
      // api요청 추가
      setSearchWord(name);
      setSearchedData(productList);
      setMainContent('SearchProducts');
    } else {
      // searchWord로 api 요청
      setSearchedData(productList);
      setMainContent('SearchProducts');
    }
  };
  useEffect(() => {
    if (mainContent === 'SearchProducts' || mainContent === 'AllProducts') return;
    setSearchedData([]);
    setMainContent('Search');
  }, [searchWord]);
  useEffect(() => {
    if (!state) return;
    const { MainContent: MainContentState } = state;
    if (MainContentState) setMainContent(MainContentState);
  }, []);
  return (
    <div className="w-full h-full overflow-scroll">
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
          setSearchWord={(word: string) => setSearchWord(word)}
          searchWord={searchWord}
          onClickSearch={onClickSearch}
          setMainContent={setMainContent}
          onClick={() => {
            goBack();
          }}
        />
      )}
      {mainContent !== 'Search' && mainContent !== 'OnlySearch' && (
        <div className="px-4 fixed flex flex-col w-[inherit] max-w-[425px] bg-white pt-[50px]">
          <div className="h-12 w-full flex justify-between items-center overflow-x-scroll">
            {categoryList.map((categoryName) =>
              categoryName === category ? (
                <div
                  key={categoryName}
                  className="box-border h-12 w-[1/3] text-center leading-[3rem] border-b border-red-500 text-red-500"
                  onClick={() => {
                    setCategory(categoryName);
                  }}
                >
                  {categoryName}
                </div>
              ) : (
                <div
                  key={categoryName}
                  className="text-center leading-[3rem] w-[1/3]"
                  onClick={() => {
                    setCategory(categoryName);
                  }}
                >
                  {categoryName}
                </div>
              ),
            )}
          </div>
          <div className="w-full h-8 border-t border-b border-gray-200 flex items-center justify-end">
            <div className="flex items-center">
              <label htmlFor="affco-filter" className="text-gray-700 text-[0.8rem]">
                AFFCO 만족 상품
              </label>
              <input type="checkbox" name="" id="affco-filter" />
            </div>
          </div>
        </div>
      )}
      {mainContent !== 'Search' && mainContent !== 'OnlySearch' && (
        <div className="pt-32 flex flex-col gap-1 pb-20">
          {(mainContent === 'AllProducts' ? productList : searchedData)?.map((product) => (
            <div
              key={product.productId}
              className="px-2"
              onClick={() => navigate(`/product/${product.productId}`)}
            >
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      )}
      {(mainContent === 'Search' || mainContent === 'OnlySearch') && (
        <SearchPage onClickSearch={onClickSearch} searchWord={searchWord} />
      )}
      <Footer />
    </div>
  );
}
