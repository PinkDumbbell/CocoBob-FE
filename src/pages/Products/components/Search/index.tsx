import { useState, useEffect } from 'react';
import { RelatedSearchKeywordContainer } from './index.style';

interface ISearch {
  searchKeyword: string;
  onClickSearch: any;
}
export default function Search(props: ISearch) {
  const { searchKeyword, onClickSearch } = props;

  const [relatedWords, setRelatedWords] = useState<string[]>([]);
  // todo: 검색 가능한 키워드 선정하기
  const searchKeywordList = ['강아지 사료', '사료', '고양이', '영양제', ''];

  const sortFunction = (a: string, b: string) => {
    const lengthOfSearchKeyword = searchKeyword.length;
    const searchKeywordLowerCase = searchKeyword.toString().toLowerCase();
    if (
      a.toLowerCase().substring(0, lengthOfSearchKeyword) === searchKeywordLowerCase &&
      b.toLowerCase().substring(0, lengthOfSearchKeyword) === searchKeywordLowerCase
    ) {
      return 0;
    }
    if (a.toLowerCase().substring(0, lengthOfSearchKeyword) === searchKeywordLowerCase) {
      return -1;
    }
    return b.toLowerCase().substring(0, lengthOfSearchKeyword) === searchKeywordLowerCase ? 1 : 0;
  };
  useEffect(() => {
    setRelatedWords(
      [...searchKeywordList]
        .filter((word) =>
          word.toString().toLowerCase().includes(searchKeyword.toString().toLowerCase()),
        )
        .sort(sortFunction),
    );
  }, [searchKeyword]);
  const letterEmphasis = (word: string) => {
    const pattern = new RegExp(searchKeyword, 'i');
    const matchString = word.match(pattern);

    if (matchString && matchString.length !== 0)
      return word.replace(matchString[0], `<strong>${matchString[0]}</strong>`);

    return '';
  };
  return (
    <div className="w-full h-full pt-[50px]">
      {searchKeyword !== '' && (
        <RelatedSearchKeywordContainer>
          {relatedWords.map((word) => (
            <span
              key={word}
              dangerouslySetInnerHTML={{ __html: letterEmphasis(word) }}
              onClick={() => {
                onClickSearch(word);
              }}
            />
          ))}
        </RelatedSearchKeywordContainer>
      )}
      {searchKeyword === '' && <div>추천검색어</div>}
    </div>
  );
}
