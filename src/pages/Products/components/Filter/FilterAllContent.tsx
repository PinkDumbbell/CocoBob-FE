/* eslint-disable no-extra-boolean-cast */
import { ReactNode, useState } from 'react';
import ChipButton from '@/components/ChipButton';

import { ReactComponent as CloseIcon } from '@/assets/icon/close_icon.svg';
import { ReactComponent as CheckIcon } from '@/assets/icon/check_icon.svg';

import { useAppDispatch, useAppSelector } from '@/store/config';
import { getCurrentFilters, setFilters } from '@/store/slices/productsSlice';

import { FilterType } from './constant';

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

const brandList = ['로얄캐닌', '하림'];

const FilterCategory = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col gap-3 p-2">
      <h4>{title}</h4>
      <div className="flex gap-3 flex-wrap items-center justify-start">{children}</div>
    </div>
  );
};

export default function FilterAllContent({
  close,
}: // onClickShowMore,
FilterAllContentType) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getCurrentFilters);

  const [aafco, setAafco] = useState(filters?.aafco ?? false);
  const [brands, setBrands] = useState<Set<string>>(new Set());
  // eslint-disable-next-line
  const [ingredient, setIngredient] = useState<Set<string>>(new Set());

  const saveFilters = () => {
    dispatch(
      setFilters({
        aafco,
        brands: Array.from(brands),
        ingredient: Array.from(ingredient),
      }),
    );
    close();
  };

  const handleSetBrandFilter = (brand: string) => {
    setBrands((prevBrands) => {
      const newBrands = new Set(prevBrands);

      if (prevBrands.has(brand)) {
        newBrands.delete(brand);
      } else {
        newBrands.add(brand);
      }
      return newBrands;
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-1 h-10 border-b border-b-gray-400">
        <button className="h-full aspect-square" onClick={close}>
          <CloseIcon />
        </button>
        <button className="h-full aspect-square" onClick={saveFilters}>
          <CheckIcon />
        </button>
      </div>
      <div className="flex-1 bg-white">
        <div className="w-full flex flex-col gap-3 p-2">
          <h4>AAFCO 기준</h4>
          <div className="flex gap-3 flex-wrap items-center justify-start"></div>
        </div>
        <FilterCategory title="AAFCO 기준">
          <ChipButton
            content="전체 사료 보기"
            theme={!aafco ? 'primary' : 'black'}
            filled={!aafco}
            border={!!aafco}
            onClick={() => {
              setAafco(false);
            }}
          />
          <ChipButton
            content="AAFCO 만족 사료 보기"
            theme={aafco ? 'primary' : 'black'}
            filled={!!aafco}
            border={!aafco}
            onClick={() => {
              setAafco(true);
            }}
          />
        </FilterCategory>

        <FilterCategory title="브랜드">
          {brandList.map((brand) => {
            const isSelected = filters?.brands?.includes(brand);

            return (
              <ChipButton
                key={brand}
                content={brand}
                theme={isSelected ? 'primary' : 'black'}
                onClick={() => handleSetBrandFilter(brand)}
              />
            );
          })}
        </FilterCategory>
        <FilterCategory title="포함원재료">{}</FilterCategory>

        {/* {filterKeys.map((key) => {
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
        })} */}
      </div>
    </>
  );
}
