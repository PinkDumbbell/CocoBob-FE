/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useState } from 'react';
import { RelatedSearchKeywordContainer } from './index.style';

interface ISearch {
  searchInputValue: string;
  onClickSearch: (word: string) => void;
}
export default function Search(props: ISearch) {
  const { searchInputValue, onClickSearch } = props;
  const [relatedWords, setRelatedWords] = useState<string[]>([]);
  useEffect(() => {}, [searchInputValue]);
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
          {relatedWords.map((word, idx) => (
            <span
              key={idx}
              // dangerouslySetInnerHTML={{ __html: letterEmphasis(word) }}
              onClick={() => {
                onClickSearch(word);
              }}
            />
          ))}
        </RelatedSearchKeywordContainer>
      ) : (
        <div>추천검색어</div>
      )}
    </div>
  );
}
