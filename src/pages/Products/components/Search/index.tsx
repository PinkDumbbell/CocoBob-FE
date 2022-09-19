/* eslint-disable no-unused-vars */
import { useGetRelatedProductQuery } from '@/store/api/productApi';
import { Link } from 'react-router-dom';
import { RelatedSearchKeywordContainer } from './index.style';

interface ISearch {
  searchInputValue: string;
  onClickSearch: (word: string) => void;
}
export default function Search(props: ISearch) {
  const { searchInputValue, onClickSearch } = props;
  const { data } = useGetRelatedProductQuery(searchInputValue);
  // const letterEmphasis = (word: string) => {
  //   const pattern = new RegExp(searchKeyword, 'i');
  //   const matchString = word.match(pattern);

  //   if (matchString && matchString.length !== 0)
  //     return word.replace(matchString[0], `<strong>${matchString[0]}</strong>`);

  //   return '';
  // };
  return (
    <div className="w-full h-full">
      {searchInputValue !== '' ? (
        <RelatedSearchKeywordContainer>
          <span
            onClick={() => {
              onClickSearch(searchInputValue);
            }}
          >
            {searchInputValue}
          </span>
          {data?.map((product) => (
            <Link
              key={product.productId}
              to={`/products/${product.productId}`}
            >{`${product.brand} ${product.name}`}</Link>
          ))}
        </RelatedSearchKeywordContainer>
      ) : (
        <div>추천검색어</div>
      )}
    </div>
  );
}
