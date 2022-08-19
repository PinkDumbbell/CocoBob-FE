import goBackImg from '@/assets/icon/go_back_btn.png';
import { ReactComponent as SearchIcon } from '@/assets/icon/search_icon.svg';
import { useRef } from 'react';

interface ISearch {
  setSearchWord: any;
  onClick: any;
  searchWord: string;
  onClickSearch: any;
  setMainContent: any;
}

export default function SearchHeader(props: ISearch) {
  const { setSearchWord, searchWord, onClick, onClickSearch, setMainContent } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearchKeyword = () => {
    setSearchWord('');
  };
  return (
    <div className="px-[8px] flex space-between items-center h-[50px] border-b border-gray-200 w-full z-[1000] bg-white">
      <button onClick={() => onClick()} className="h-full flex items-center justify-center px-3">
        <img src={goBackImg} />
      </button>
      <div className="relative flex items-center flex-1 px-1">
        <input
          className="w-full bg-slate-200 p-1 px-3 rounded-[10px]"
          onChange={(e) => {
            setMainContent('Search');
            setSearchWord(e.target.value);
          }}
          value={searchWord}
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onClickSearch();
              inputRef.current?.blur();
            }
          }}
        />
        {searchWord !== '' && (
          <button
            className="absolute right-1 px-3 h-full font-medium text-sm leading-3"
            onClick={clearSearchKeyword}
          >
            x
          </button>
        )}
      </div>
      <button
        className="h-full flex items-center justify-center px-2"
        onClick={() => {
          onClickSearch();
          inputRef.current?.blur();
        }}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
