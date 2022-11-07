/* eslint-disable no-extra-boolean-cast */
import { ReactNode, useState, Dispatch, SetStateAction } from 'react';

import ChipButton from '@/components/ChipButton';

import { ReactComponent as CloseIcon } from '@/assets/icon/close_icon.svg';
import { ReactComponent as CheckIcon } from '@/assets/icon/check_icon.svg';

import { useAppDispatch, useAppSelector } from '@/store/config';
import { getCurrentFilters, setFilters } from '@/store/slices/productsSlice';

import { allFilters } from './constant';

type FilterAllContentType = {
  close: () => void;
  clearFilters: () => void;
};

type ChipButtonStyleProps = { theme?: 'primary' | 'black'; filled?: boolean; border?: boolean };

const FilterCategory = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col gap-3 p-2">
      <h3 className="text-h3">{title}</h3>
      <div className="flex gap-3 flex-wrap text-caption items-center justify-start pb-semi-min">
        {children}
      </div>
    </div>
  );
};

const removeFilter = (toRemove: string) => (set: Set<string>) => {
  const newSet = new Set(set);
  newSet.delete(toRemove);
  return newSet;
};

const addFilter = (toAdd: string) => (set: Set<string>) => {
  const newSet = new Set(set);
  newSet.add(toAdd);
  return newSet;
};

const FilterHeader = ({ close, save }: { close: () => void; save: () => void }) => {
  return (
    <div className="flex items-center justify-between p-1 h-10 border-b border-b-secondary-brightest">
      <button className="h-full aspect-square" onClick={close}>
        <CloseIcon />
      </button>
      <button className="h-full aspect-square" onClick={save}>
        <CheckIcon />
      </button>
    </div>
  );
};
export default function FilterAllContent({ close, clearFilters }: FilterAllContentType) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getCurrentFilters);

  const [aafco, setAafco] = useState(filters?.aafco ?? false);
  const [brands, setBrands] = useState<Set<string>>(new Set(filters?.brands ?? []));
  const [ingredient, setIngredient] = useState<Set<string>>(new Set(filters?.ingredient ?? []));
  const [allergyIngredient, setAllergyIngredient] = useState<Set<string>>(
    new Set(filters?.allergyIngredient ?? []),
  );

  const saveFilters = () => {
    clearFilters();
    dispatch(
      setFilters({
        page: 0,
        aafco,
        brands: Array.from(brands),
        ingredient: Array.from(ingredient),
        allergyIngredient: Array.from(allergyIngredient),
      }),
    );
    close();
  };

  const handleSetFilter =
    (setState: Dispatch<SetStateAction<Set<string>>>, isSelected: boolean, filterValue: string) =>
    () => {
      if (isSelected) {
        setState(removeFilter(filterValue));
      } else {
        setState(addFilter(filterValue));
      }
    };

  const filterProps = (isSelected: boolean) =>
    ({
      theme: isSelected ? 'primary' : 'black',
      filled: isSelected,
      border: !isSelected,
    } as ChipButtonStyleProps);

  const renderBrands = allFilters.brands.items.map((brand) => {
    const isSelected = brands.has(brand);

    return (
      <ChipButton
        {...filterProps(isSelected)}
        key={brand}
        content={brand}
        onClick={handleSetFilter(setBrands, isSelected, brand)}
      />
    );
  });

  const renderIngredients = allFilters.ingredients.items.map(({ name, filterValue }) => {
    const isSelected = ingredient.has(filterValue);

    return (
      <ChipButton
        {...filterProps(isSelected)}
        key={filterValue}
        content={name}
        onClick={handleSetFilter(setIngredient, isSelected, filterValue)}
      />
    );
  });

  const renderAllergyIngredients = allFilters.allergyIngredient.items.map(
    ({ name, filterValue }) => {
      const isSelected = allergyIngredient.has(filterValue);

      return (
        <ChipButton
          {...filterProps(isSelected)}
          key={filterValue}
          content={name}
          onClick={handleSetFilter(setAllergyIngredient, isSelected, filterValue)}
        />
      );
    },
  );

  return (
    <>
      <FilterHeader save={saveFilters} close={close} />
      <div className="flex-1 bg-white overflow-y-auto pt-0">
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
        <FilterCategory title={allFilters.brands.name}>{renderBrands}</FilterCategory>
        <FilterCategory title={allFilters.ingredients.name}>{renderIngredients}</FilterCategory>
        <FilterCategory title={allFilters.allergyIngredient.name}>
          {renderAllergyIngredients}
        </FilterCategory>
      </div>
    </>
  );
}
