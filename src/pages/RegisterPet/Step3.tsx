import { IBreeds } from '@/@type/pet';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import FormButton from '@/components/Form/FormButton';
import { InputStyle } from '@/components/Form/FormInput';
import { useGetBreedsQuery } from '@/store/api/petApi';
import { useAppDispatch, useAppSelector } from '@/store/config';
import { setRegisterInfo } from '@/store/slices/registerPetSlice';
import { favBreeds } from '@/utils/constants/enrollment';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { concatClasses } from '@/utils/libs/concatClasses';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { useForm } from 'react-hook-form';
import useSearchBreed from './hooks/useSearchBreed';
import { ButtonWrapper, Form, PageContainer, PetNameHighlight, QuestionText } from './index.style';

interface IBreedList {
  breeds: IBreeds[];
  selectedBreed?: IBreeds;
  setBreed: Dispatch<SetStateAction<IBreeds | undefined>>;
}
const BreedList = ({ breeds, selectedBreed, setBreed }: IBreedList) => (
  <>
    {breeds.map((breed) => (
      <div key={breed.id} onClick={() => setBreed(breed)}>
        <p
          className={concatClasses(selectedBreed?.id === breed.id ? 'bg-primary-100' : '', 'py-2')}
        >
          <span className="inline-block text-primary-900 w-14">{breed.size}</span>
          <span>{breed.name}</span>
        </p>
      </div>
    ))}
  </>
);

const SearchBreedBottomSheet = ({
  isBottomSheetOpen,
  setBreed,
}: {
  isBottomSheetOpen: boolean;
  setBreed: Dispatch<SetStateAction<IBreeds | undefined>>;
}) => {
  const { isLoading, isSuccess, data } = useGetBreedsQuery();
  const breeds = data ?? ([] as IBreeds[]);

  const {
    closeBreedBottomSheet,
    foundBreeds,
    onChangeSearchKeyword,
    searchKeyword,
    selectedBreed,
    setSelectedBreed,
  } = useSearchBreed(breeds);

  const onClickSelectButton = () => {
    setBreed(selectedBreed);
    closeBreedBottomSheet();
  };

  return (
    <BottomSheet isOpen={isBottomSheetOpen}>
      <div className="p-4 flex flex-col gap-2">
        <InputStyle
          isError={false}
          value={searchKeyword}
          onChange={onChangeSearchKeyword}
          placeholder="품종을 검색해보세요"
        />
        {isLoading && <div className="h-[50vh] px-2 py-3 overflow-y-scroll">로딩중...</div>}
        {isSuccess && (
          <div className="h-[50vh] px-2 py-3 overflow-y-scroll">
            {
              <BreedList
                breeds={!searchKeyword ? breeds : foundBreeds}
                selectedBreed={selectedBreed}
                setBreed={setSelectedBreed}
              />
            }
          </div>
        )}
        <Button label="선택" onClick={onClickSelectButton} />
      </div>
    </BottomSheet>
  );
};

export default function Step3({ goNextStep }: any) {
  const { isBottomSheetOpen, openBottomSheet, closeBottomSheet } = useBottomSheet('findBreed');

  const { isSuccess, data: breeds } = useGetBreedsQuery();
  const [breed, setBreed] = useState<IBreeds | undefined>();

  const dispatch = useAppDispatch();
  const registerInfo = useAppSelector((state) => state.registerPet.registerInfo);
  const { handleSubmit } = useForm();

  const onValidSubmit = () => {
    if (!breed) {
      alert('견종을 선택해주세요');
      return;
    }
    dispatch(
      setRegisterInfo({
        breedId: breed.id,
      }),
    );
    goNextStep();
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      closeBottomSheet();
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const currentBreed = breeds.find((value) => value.id === registerInfo.breedId);
      setBreed(currentBreed);
    }
  }, [isSuccess]);

  return (
    <PageContainer>
      <div className="mb-4">
        <QuestionText>
          <PetNameHighlight>{registerInfo.name}</PetNameHighlight>에 대해서 더 알려주세요
        </QuestionText>
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-4">
          <InputStyle
            isError={false}
            className="text-gray-400 text-left p-2 border-b border-b-gray-400"
            onClick={openBottomSheet}
            placeholder={breed?.id ? breed.name : '품종을 검색해보세요'}
          />

          <div className="flex flex-wrap gap-2 items-center py-2">
            {favBreeds.map((breedChip: IBreeds) => (
              <span
                className={concatClasses(
                  'py-1 px-2 text-sm rounded-lg whitespace-nowrap',
                  breedChip.id === breed?.id
                    ? 'border border-primary-900 bg-primary-100 text-primary-900'
                    : 'border',
                )}
                onClick={() => setBreed(breedChip)}
                key={breedChip.id}
              >
                {breedChip.name}
              </span>
            ))}
          </div>
        </div>
        <ButtonWrapper>
          <FormButton name="다음으로" disabled={false} />
        </ButtonWrapper>
      </Form>
      <SearchBreedBottomSheet isBottomSheetOpen={isBottomSheetOpen} setBreed={setBreed} />
    </PageContainer>
  );
}
