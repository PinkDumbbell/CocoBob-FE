import { IBreeds } from '@/@type/pet';
import { selectRegisterInfo } from '@/store/slices/registerPetSlice';
import { breedsMock } from '@/utils/constants/enrollment';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface UseSearchBreedReturn {
  breeds: IBreeds[];
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
export default function useSearchBreed(): UseSearchBreedReturn {
  const { currentBottomSheet, closeBottomSheet } = useBottomSheet('findBreed');

  const registerInfo = useSelector(selectRegisterInfo);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<IBreeds | undefined>(undefined);

  const foundBreeds = breedsMock.filter((breed) => breed.breedName.includes(searchKeyword));

  const onSelectBreed = (breed: IBreeds) => {
    setSelectedBreed(breed);
    closeBottomSheet();
  };
  const closeBreedBottomSheet = () => closeBottomSheet();

  const onChangeSearchKeyword = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchKeyword(e.target.value);

  useEffect(() => {
    if (!registerInfo.breedId) return;

    const currentBreed = breedsMock.find((v) => v.breedId === registerInfo.breedId);
    setSelectedBreed(currentBreed);
  }, []);

  useEffect(() => {
    setSearchKeyword('');
  }, [currentBottomSheet]);

  return {
    breeds: breedsMock,
    setSelectedBreed,
    searchKeyword,
    onChangeSearchKeyword,
    selectedBreed,
    foundBreeds,
    onSelectBreed,
    closeBreedBottomSheet,
  };
}
