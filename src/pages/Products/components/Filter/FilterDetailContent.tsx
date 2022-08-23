import { useState } from 'react';
import BackIcon from '@/assets/icon/go_back_btn.png';
import { allFilters, FilterPropertiesType, FilterType } from './constant';

type FilterDetailContentType = {
  filterType: FilterType;
  currentSelectedFilters: Set<string>;
  showAllFilters: () => void;
  // eslint-disable-next-line no-unused-vars
  saveDetailFilter: (selectedFilters: Set<string>) => void;
};

export default function FilterDetailContent({
  filterType,
  currentSelectedFilters,
  showAllFilters,
  saveDetailFilter,
}: FilterDetailContentType) {
  const currentFilter = allFilters[filterType];
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(currentSelectedFilters);

  const onClickSave = () => {
    saveDetailFilter(selectedFilters);
  };
  const checkHandler = (filter: string) => {
    setSelectedFilters((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(filter)) newSelected.delete(filter);
      else newSelected.add(filter);
      return newSelected;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-1 w-full h-full relative pt-12">
        <div className="absolute top-0 h-10 flex items-center justify-between p-1 border-b border-b-gray-500 w-full">
          <button
            type="button"
            className="h-full aspect-square flex items-center justify-center"
            onClick={showAllFilters}
          >
            <img src={BackIcon} alt="" />
          </button>
          <h4>{currentFilter.name}</h4>
          <button type="button" onClick={onClickSave}>
            저장
          </button>
        </div>
        <div className="w-full h-10">
          <input type="search" className="border w-full p-2" placeholder="검색어를 입력하세요" />
        </div>
        <div className="flex-1 pt-1 overflow-y-scroll">
          {currentFilter.items.map((filter: FilterPropertiesType, idx) => (
            <div className="w-full px-4 h-12 border-b flex items-center" key={idx}>
              <button className="flex items-center justify-between w-full">
                <span>{filter.name}</span>
                <input
                  type="checkbox"
                  value={filter.filterValue}
                  checked={selectedFilters.has(filter.filterValue)}
                  onChange={(e) => checkHandler(e.target.value)}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
