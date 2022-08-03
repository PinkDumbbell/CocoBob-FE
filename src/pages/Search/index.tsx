import { useNavigate } from 'react-router-dom';
import goBackImg from '@/assets/icon/go_back_btn.png';
import ProductItem from '@/components/Product';
import { ChangeEvent, useState } from 'react';
import { RelatedWordContainer } from './index.style';

export default function SearchPage() {
  const navigator = useNavigate();
  const [searchWord, setSearchWord] = useState<string>('');
  const [relatedWords, setRelatedWords] = useState<string[]>([]);
  const [searchedData, setSearchedData] = useState<any[]>([]);
  // todo: 검색 가능한 키워드 선정하기
  const searchWordList = ['강아지 사료', '사료', '고양이', '영양제', ''];

  const sortFunction = (a: string, b: string) => {
    const len = searchWord.length;
    const searchWordLowerCase = searchWord.toString().toLowerCase();
    if (
      a.toLowerCase().substring(0, len) === searchWordLowerCase &&
      b.toLowerCase().substring(0, len) === searchWordLowerCase
    ) {
      return 0;
    }
    if (a.toLowerCase().substring(0, len) === searchWordLowerCase) {
      return -1;
    }
    return b.toLowerCase().substring(0, len) === searchWordLowerCase ? 1 : 0;
  };
  const onChangeWord = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedData([]);
    setSearchWord(e.target.value);
    // todo : 연관 검색어 리스트 인데 규칙 추가해서 수정 필요
    setRelatedWords(
      [...searchWordList]
        .filter((word) =>
          word.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()),
        )
        .sort(sortFunction),
    );
  };
  const onClickSearch = (word: string) => {
    // api요청으로 변경 필요
    setSearchWord(word);
    setSearchedData(['사료', '밥']);
  };
  const letterEmphasis = (word: string) => {
    const pattern = new RegExp(searchWord, 'i');
    const matchString = word.match(pattern);

    if (matchString && matchString.length !== 0)
      return word.replace(matchString[0], `<strong>${matchString[0]}</strong>`);

    return '';
  };
  return (
    <div className="w-full h-full">
      <div className="h-[50px] border-b border-gray-800 align-middle ">
        <button onClick={() => navigator(-1)} className="h-14 ml-3">
          <img src={goBackImg} />
        </button>
        <input
          className="w-64 ml-8 bg-slate-400 p-1 pl-2 rounded-[10px]"
          onChange={onChangeWord}
          value={searchWord}
          onKeyPress={(e) => {
            if (e.key !== 'Enter') onClickSearch(e.target.value);
          }}
        />
        {searchWord !== '' && (
          <button
            className="w-8 left-[-30px] relative"
            onClick={() => {
              setSearchWord('');
              setSearchedData([]);
            }}
          >
            x
          </button>
        )}
      </div>
      {searchWord !== '' && searchedData.length === 0 && (
        <RelatedWordContainer>
          {relatedWords.map((word) => (
            <span
              key={word}
              dangerouslySetInnerHTML={{ __html: letterEmphasis(word) }}
              onClick={() => onClickSearch(word)}
            />
          ))}
        </RelatedWordContainer>
      )}
      {searchedData.length !== 0 && (
        <div className="flex flex-col gap-1 h-full overflow-scroll">
          {Array(12)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="px-2">
                <ProductItem />
              </div>
            ))}
        </div>
      )}
      {searchWord === '' && searchedData.length === 0 && <div>추천검색어</div>}
    </div>
  );
}
