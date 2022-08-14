import { useState, useEffect } from 'react';
import { RelatedSearchKeywordContainer } from './index.style';

interface ISearch {
  searchWord: string;
  onClickSearch: any;
}
export default function Search(props: ISearch) {
  const { searchWord, onClickSearch } = props;

  const [relatedWords, setRelatedWords] = useState<string[]>([]);
  // todo: 검색 가능한 키워드 선정하기
  const searchWordList = ['강아지 사료', '사료', '고양이', '영양제', ''];

  const sortFunction = (a: string, b: string) => {
    const lengthOfSearchKeyword = searchWord.length;
    const searchWordLowerCase = searchWord.toString().toLowerCase();
    if (
      a.toLowerCase().substring(0, lengthOfSearchKeyword) === searchWordLowerCase &&
      b.toLowerCase().substring(0, lengthOfSearchKeyword) === searchWordLowerCase
    ) {
      return 0;
    }
    if (a.toLowerCase().substring(0, lengthOfSearchKeyword) === searchWordLowerCase) {
      return -1;
    }
    return b.toLowerCase().substring(0, lengthOfSearchKeyword) === searchWordLowerCase ? 1 : 0;
  };
  useEffect(() => {
    setRelatedWords(
      [...searchWordList]
        .filter((word) =>
          word.toString().toLowerCase().includes(searchWord.toString().toLowerCase()),
        )
        .sort(sortFunction),
    );
  }, [searchWord]);
  const letterEmphasis = (word: string) => {
    const pattern = new RegExp(searchWord, 'i');
    const matchString = word.match(pattern);

    if (matchString && matchString.length !== 0)
      return word.replace(matchString[0], `<strong>${matchString[0]}</strong>`);

    return '';
  };
  return (
    <div className="w-full h-full overflow-scroll pt-[50px]">
      {searchWord !== '' && (
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
      {searchWord === '' && <div>추천검색어</div>}
    </div>
  );
}
