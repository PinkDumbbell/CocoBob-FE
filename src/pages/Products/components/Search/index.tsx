/* eslint-disable no-unused-vars */
import { useGetRelatedWordQuery } from '@/store/api/productApi';
import { RelatedSearchKeywordContainer } from './index.style';

interface ISearch {
  searchInputValue: string;
  onClickSearch: (word: string) => void;
}
export default function Search(props: ISearch) {
  const { searchInputValue, onClickSearch } = props;
  const { data } = useGetRelatedWordQuery(searchInputValue);
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
          {data?.names.map((word, idx) => (
            <span
              key={idx}
              // dangerouslySetInnerHTML={{ __html: letterEmphasis(word) }}
              onClick={() => {
                onClickSearch(word);
              }}
            >
              {word}
            </span>
          ))}
        </RelatedSearchKeywordContainer>
      ) : (
        <div>추천검색어</div>
      )}
    </div>
  );
}
