import React from 'react';
import Portal from '@/portal';
import SearchHeader from '@/pages/Products/components/Search/header';
import RecommandContent from '@/pages/Products/components/Search';

export default function SearchModal({
  onClose,
  searchInputValue,
  setSearchInputValue,
  onClickSearch,
}: any) {
  return (
    <Portal>
      <div className="fixed top-0 left-0 right-0 mx-auto flex flex-col w-full max-w-[425px] bg-white">
        <SearchHeader
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          onClickSearch={onClickSearch}
          goBack={onClose}
        />
        {searchInputValue === '' && (
          <div className="w-full h-screen">
            <RecommandContent searchInputValue={searchInputValue} onClickSearch={onClickSearch} />
          </div>
        )}
      </div>
    </Portal>
  );
}
