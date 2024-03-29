import { Dispatch, SetStateAction } from 'react';

import FilterAllContent from './FilterAllContent';

export type FilterModalProps = {
  setPage?: Dispatch<SetStateAction<number>>;
  close: () => void;
  clearFilters: () => void;
};

export default function FilterModal({ close, clearFilters }: FilterModalProps) {
  return (
    <>
      <div className="fixed bottom-0 z-[9000] w-full max-w-full h-3/5 rounded-t bg-white shadow-min">
        <div className="flex flex-col w-full h-full p-2">
          <FilterAllContent close={close} clearFilters={clearFilters} />
        </div>
      </div>
      <div className="z-[8000] bg-dim-black max-w-full fixed top-0 w-full h-full" />
    </>
  );
}
