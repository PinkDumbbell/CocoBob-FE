import { IBreeds } from '@/@type/pet';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UseSearchBreedReturn {
  selectedBreed: IBreeds | undefined;
  setSelectedBreed: Dispatch<SetStateAction<IBreeds | undefined>>;
  searchKeyword: string;
  // eslint-disable-next-line no-unused-vars
  onChangeSearchKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  foundBreeds: IBreeds[];
  // eslint-disable-next-line no-unused-vars
  onSelectBreed: (breeds: IBreeds) => void;
  closeBreedBottomSheet: () => void;
}
export default function useSearchBreed(
  breeds: IBreeds[],
  currentBreedId?: number,
): UseSearchBreedReturn {
  const { isBottomSheetOpen, closeBottomSheet } = useBottomSheet('findBreed');

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<IBreeds | undefined>();

  const foundBreeds = breeds.filter((breed) => breed.name.includes(searchKeyword)) ?? [];

  const onSelectBreed = (breed: IBreeds) => {
    setSelectedBreed(breed);
    closeBottomSheet();
  };
  const closeBreedBottomSheet = () => closeBottomSheet();

  const onChangeSearchKeyword = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchKeyword(e.target.value);

  useEffect(() => {
    if (!currentBreedId || !Array.isArray(breeds)) return;

    const currentBreed = breeds.find((v) => v.id === currentBreedId);
    setSelectedBreed(currentBreed);
  }, [breeds]);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => setSearchKeyword('');
  }, [isBottomSheetOpen]);

  useEffect(() => {
    if (!currentBreedId) return;
    const currentBreed = foundBreeds.find((breed) => breed.id === currentBreedId);
    setSelectedBreed(currentBreed);
  }, [currentBreedId]);
  return {
    setSelectedBreed,
    searchKeyword,
    onChangeSearchKeyword,
    selectedBreed,
    foundBreeds,
    onSelectBreed,
    closeBreedBottomSheet,
  };
}
