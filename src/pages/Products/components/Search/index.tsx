/* eslint-disable no-unused-vars */
import { useGetRelatedProductWithKeywordQuery } from '@/store/api/productApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RelatedSearchKeywordContainer } from './index.style';

interface ISearch {
  searchInputValue: string;
  onClickSearch: (word: string) => void;
}
export default function Search(props: ISearch) {
  const { searchInputValue, onClickSearch } = props;
  const [keywordForSearch, setKeywordForSearch] = useState<string>('');
  const { data } = useGetRelatedProductWithKeywordQuery(keywordForSearch);
  const [timeoutId, setTimeoutId] = useState<any>();

  const setNewKeyword = () => {
    console.log(`키워드에 검색되는 거 : ${timeoutId} ${searchInputValue}`);
    setKeywordForSearch(searchInputValue);
    setTimeoutId(null);
  };
  useEffect(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      console.log(`삭제되는거 : ${timeoutId}`);
    }
    const newTimeoutId = setTimeout(setNewKeyword, 1000);
    setTimeoutId(() => {
      console.log(`새로운거 : ${newTimeoutId}`);
      return newTimeoutId;
    });
  }, [searchInputValue]);
  useEffect(() => {
    console.log(`변경됨 ${timeoutId}`);
  }, [timeoutId]);
  const letterEmphasis = (word: string) => {
    const pattern = new RegExp(keywordForSearch, 'i');
    const matchString = word.match(pattern);

    if (matchString && matchString.length !== 0)
      return word.replace(matchString[0], `<strong>${matchString[0]}</strong>`);
    return word;
  };
  return (
    <div className="w-full h-full p-2">
      {keywordForSearch !== '' ? (
        <RelatedSearchKeywordContainer>
          <span
            onClick={() => {
              onClickSearch(searchInputValue);
            }}
          >
            {searchInputValue}
          </span>
          {data?.map((product) => (
            <Link key={product.productId} to={`/products/${product.productId}`}>
              <span
                dangerouslySetInnerHTML={{
                  __html: letterEmphasis(`${product.brand} ${product.name}`),
                }}
              />
            </Link>
          ))}
        </RelatedSearchKeywordContainer>
      ) : (
        <div className="text-h3">추천검색어</div>
      )}
    </div>
  );
}
