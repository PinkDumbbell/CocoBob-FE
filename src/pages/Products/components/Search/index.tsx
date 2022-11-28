import { useGetRelatedProductWithKeywordQuery } from '@/store/api/productApi';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RelatedSearchKeywordContainer } from './index.style';

interface ISearch {
  searchInputValue: string;
  // eslint-disable-next-line
  onClickSearch: (word: string) => void;
}
export default function Search(props: ISearch) {
  const { searchInputValue, onClickSearch } = props;

  const timeoutId = useRef<number | null>(null);
  const [keywordForSearch, setKeywordForSearch] = useState<string>('');
  const { data } = useGetRelatedProductWithKeywordQuery(keywordForSearch);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = window.setTimeout(() => {
      setKeywordForSearch(searchInputValue);
    }, 200);
  }, [searchInputValue]);

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
