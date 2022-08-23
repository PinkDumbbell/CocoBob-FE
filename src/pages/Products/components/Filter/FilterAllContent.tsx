/* eslint-disable no-extra-boolean-cast */
import ChipButton from '@/components/ChipButton';

import { ReactComponent as CloseIcon } from '@/assets/icon/close_icon.svg';
import { ReactComponent as CheckIcon } from '@/assets/icon/check_icon.svg';

import { FilterType, allFilters, filterKeys, FilterPropertiesType } from './constant';

type FilterAllContentType = {
  close: () => void;
  aafco?: boolean | null;
  aged?: boolean | null;
  isGrowing?: boolean | null;
  selectedFilters: Set<string>;
  // eslint-disable-next-line no-unused-vars
  setFilter: (values: string) => void;
  onClickSave: () => void;
  // eslint-disable-next-line no-unused-vars
  onClickShowMore: (filterName: FilterType) => void;
};

export default function FilterAllContent({
  close,
  aafco,
  aged,
  isGrowing,
  selectedFilters,
  setFilter,
  onClickSave,
  onClickShowMore,
}: FilterAllContentType) {
  const allAge =
    aged === null || (aged === undefined && isGrowing === null) || isGrowing === undefined;

  const growingAge = aged === false && !!isGrowing;
  const adultAge = aged === false && isGrowing === false;
  const agedAge = aged === true && isGrowing === false;

  const renderFilterButtons = (filters: FilterPropertiesType[]) => {
    return filters.map((item) => {
      const isSelected = selectedFilters.has(item.filterValue);
      return (
        <ChipButton
          key={item.filterValue}
          content={item.name}
          theme={isSelected ? 'primary' : 'black'}
          border={!isSelected}
          filled={isSelected}
          onClick={() => setFilter(item.filterValue)}
        />
      );
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-1 h-10 border-b border-b-gray-400">
        <button className="h-full aspect-square" onClick={close}>
          <CloseIcon />
        </button>
        <button className="h-full aspect-square" onClick={onClickSave}>
          <CheckIcon />
        </button>
      </div>
      <div className="flex-1 bg-white">
        <div className="w-full flex flex-col gap-3 p-2">
          <h4>AAFCO 기준</h4>
          <div className="flex gap-3 flex-wrap items-center justify-start">
            <ChipButton
              content="전체 사료 보기"
              theme={!aafco ? 'primary' : 'black'}
              filled={!aafco}
              border={!!aafco}
            />
            <ChipButton
              content="AAFCO 만족 사료 보기"
              theme={aafco ? 'primary' : 'black'}
              filled={!!aafco}
              border={!aafco}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 p-2">
          <h4>연령별</h4>
          <div className="flex gap-3 flex-wrap items-center justify-start">
            {/* 
                전체: aged: null, isGrowing:null
                성장기: aged:false, isGrowing:true
                성견: aged:false, isGrowing:false
                노견: aged:true, isGrowing:false
            */}
            <ChipButton
              content="전체 사료 보기"
              theme={allAge ? 'primary' : 'black'}
              filled={allAge}
              border={!allAge}
            />
            <ChipButton
              content="성장기 사료 보기"
              theme={growingAge ? 'primary' : 'black'}
              filled={growingAge}
              border={!growingAge}
            />
            <ChipButton
              content="성견 사료 보기"
              theme={adultAge ? 'primary' : 'black'}
              filled={adultAge}
              border={!adultAge}
            />
            <ChipButton
              content="노견 사료 보기"
              theme={agedAge ? 'primary' : 'black'}
              filled={agedAge}
              border={!agedAge}
            />
          </div>
        </div>
        {filterKeys.map((key) => {
          const currentFilter = allFilters[key];
          const showMoreButton = allFilters[key].items.length > 4;
          const previewFilters = allFilters[key].items.slice(0, 4);
          const additionalFilters = allFilters[key].items.filter(
            ({ filterValue }: FilterPropertiesType) =>
              !previewFilters.find((v) => v.filterValue === filterValue) &&
              selectedFilters.has(filterValue),
          );

          return (
            <div key={currentFilter.name} className="w-full flex flex-col gap-3 p-2">
              <h4 className="text-lg">{currentFilter.name}</h4>
              <div className="flex gap-3 flex-wrap items-center justify-start">
                {renderFilterButtons(additionalFilters)}
                {renderFilterButtons(previewFilters)}
                {showMoreButton && (
                  <ChipButton content="더보기" theme="black" onClick={() => onClickShowMore(key)} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
