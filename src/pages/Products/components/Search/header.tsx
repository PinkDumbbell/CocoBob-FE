import goBackImg from '@/assets/icon/go_back_btn.png';
import { useRef } from 'react';

interface ISearch {
  setSearchWord: any;
  onClick: any;
  searchWord: string;
  onClickSearch: any;
  setChildrenElement: any;
}

export default function SearchHeader(props: ISearch) {
  const { setSearchWord, searchWord, onClick, onClickSearch, setChildrenElement } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-[50px] border-b border-gray-200 align-middle fixed w-full z-[1000]">
      <button onClick={() => onClick()} className="h-14 ml-3">
        <img src={goBackImg} />
      </button>
      <input
        className="w-64 ml-8 bg-slate-400 p-1 pl-2 rounded-[10px]"
        onChange={(e) => {
          setChildrenElement(1);
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
          className="w-8 left-[-30px] relative"
          onClick={() => {
            setSearchWord('');
          }}
        >
          x
        </button>
      )}
    </div>
  );
}
