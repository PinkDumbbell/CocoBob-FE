import { IBreeds } from '@/@type/pet';
import { selectRegisterInfo } from '@/store/slices/registerPetSlice';
import { breedsMock } from '@/utils/constants/enrollment';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useSearchBreed() {
  const { currentBottomSheet, closeBottomSheet } = useBottomSheet('findBreed');

  const registerInfo = useSelector(selectRegisterInfo);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<IBreeds | undefined>(undefined);

  const foundBreeds = breedsMock.filter((breed) => breed.breedName.includes(searchKeyword));

  const onSelectBreed = (breed: IBreeds) => {
    setSelectedBreed(breed);
    closeBottomSheet();
  };

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
    searchKeyword,
    onChangeSearchKeyword,
    selectedBreed,
    foundBreeds,
    onSelectBreed,
  };
}
