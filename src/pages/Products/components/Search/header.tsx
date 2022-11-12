import goBackImg from '@/assets/icon/go_back_btn.png';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { useEffect, useRef } from 'react';

interface ISearch {
  // eslint-disable-next-line no-unused-vars
  setSearchInputValue: (value: string) => void;
  goBack: () => void;
  onClickSearch: any;
  searchKeyword: string;
  onFocus: boolean;
}

export default function SearchHeader(props: ISearch) {
  const { searchKeyword, setSearchInputValue, goBack, onClickSearch, onFocus } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearchKeyword = () => {
    setSearchInputValue('');
  };

  const search = () => {
    onClickSearch();
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (!onFocus) {
      return;
    }
    inputRef.current?.focus();
  }, []);
  return (
    <div className="absolute px-[8px] flex space-between items-center h-[50px] border-b border-primary-brightest w-full z-[1000] bg-white">
      <button onClick={goBack} className="h-full flex items-center justify-center px-3">
        <img src={goBackImg} />
      </button>
      <div className="relative flex items-center flex-1 px-1">
        <input
          className="w-full bg-slate-200 p-1 px-3 rounded"
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
          value={searchKeyword}
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              search();
            }
          }}
        />
        {searchKeyword !== '' && (
          <button
            className="absolute right-1 px-3 h-full font-medium text-label leading-3"
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
