import { Dispatch, SetStateAction, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterType } from './constant';
import FilterAllContent from './FilterAllContent';
import FilterDetailContent from './FilterDetailContent';

export type FilterModalProps = {
  setPage?: Dispatch<SetStateAction<number>>;
  close: () => void;
};

export default function FilterModal({ close }: FilterModalProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<'all' | FilterType>('all');

  const onClickSave = () => {
    const filters: { [key: string]: any } = {};

    selectedFilters.forEach((value) => {
      filters[value] = true;
    });
    close();
    setSearchParams({ name: searchParams.get('name') ?? '', ...filters });
  };
  const showMoreFilters = (filter: FilterType) => {
    setFilterType(filter);
  };
  const showAllFilters = () => {
    setFilterType('all');
  };

  const setFilter = (filter: string) => {
    setSelectedFilters((prevSelected) => {
      const newSeleted = new Set(prevSelected);
      if (newSeleted.has(filter)) newSeleted.delete(filter);
      else newSeleted.add(filter);
      return newSeleted;
    });
  };

  const setFilters = (newSelectedFilters: Set<string>) => {
    setSelectedFilters((prevSelected) => {
      const newSelected = new Set(prevSelected);

      prevSelected.forEach((value) => {
        const shouldDeleteFilter = !newSelectedFilters.has(value);
        if (shouldDeleteFilter) newSelected.delete(value);
      });
      newSelectedFilters.forEach((value) => {
        newSelected.add(value);
      });

      return newSelected;
    });
    showAllFilters();
  };

  return (
    <>
      <div className="fixed bottom-0 z-[9000] w-full max-w-[425px] h-4/5 rounded-t-[10px] bg-white shadow-sm">
        <div className="flex flex-col w-full h-full p-2">
          {filterType === 'all' && (
            <FilterAllContent
              close={close}
              selectedFilters={selectedFilters}
              setFilter={setFilter}
              onClickSave={onClickSave}
              onClickShowMore={showMoreFilters}
            />
          )}
          {filterType !== 'all' && (
            <FilterDetailContent
              filterType={filterType}
              currentSelectedFilters={selectedFilters}
              showAllFilters={showAllFilters}
              saveDetailFilter={setFilters}
            />
          )}
        </div>
      </div>
      <div className="z-[8000] bg-[#00000029] fixed top-0 w-full h-full" />
    </>
  );
}
