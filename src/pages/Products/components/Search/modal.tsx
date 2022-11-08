import React from 'react';
import Portal from '@/portal';
import RecommandContent from '@/pages/Products/components/Search';

export default function SearchModal({ searchKeyword, onClickSearch }: any) {
  return (
    <Portal>
      <div className="fixed top-[50px] left-0 right-0 mx-auto flex flex-col w-full max-w-[425px] bg-white">
        {
          <div className="w-full h-screen">
            <RecommandContent searchInputValue={searchKeyword} onClickSearch={onClickSearch} />
          </div>
        }
      </div>
    </Portal>
  );
}
