import goBackImg from '@/assets/icon/go_back_btn.png';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ISearch {
  searchInputValue: string;
  setSearchInputValue: Dispatch<SetStateAction<string>>;
  goBack: () => void;
  onClickSearch: any;
}

export default function SearchHeader(props: ISearch) {
  const { searchInputValue, setSearchInputValue, goBack, onClickSearch } = props;
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearchKeyword = () => {
    setSearchInputValue('');
  };

  const search = () => {
    onClickSearch();
    inputRef.current?.blur();
  };

  useEffect(() => {
    const nameParam = searchParams.get('name') ?? '';
    setSearchInputValue(nameParam);
    if (nameParam) inputRef.current?.focus();
  }, []);
  return (
    <div className="px-[8px] flex space-between items-center h-[50px] border-b border-gray-200 w-full z-[1000] bg-white">
      <button onClick={goBack} className="h-full flex items-center justify-center px-3">
        <img src={goBackImg} />
      </button>
      <div className="relative flex items-center flex-1 px-1">
        <input
          className="w-full bg-slate-200 p-1 px-3 rounded"
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
          value={searchInputValue}
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              search();
            }
          }}
        />
        {searchInputValue !== '' && (
          <button
            className="absolute right-1 px-3 h-full font-medium text-sm leading-3"
            onClick={clearSearchKeyword}
          >
            x
          </button>
        )}
      </div>
      <button className="h-full flex items-center justify-center px-2" onClick={search}>
        <SearchIcon />
      </button>
    </div>
  );
}
