import { IBreeds } from '@/@type/pet';
import FormButton from '@/components/Form/FormButton';
import { InputStyle } from '@/components/Form/FormInput';
import { useGetBreedsQuery } from '@/store/api/petApi';
import { favBreeds } from '@/utils/constants/enrollment';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { concatClasses } from '@/utils/libs/concatClasses';
import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import useToastMessage from '@/utils/hooks/useToastMessage';
import BreedBottomSheet from '@/components/BottomSheet/BreedBottomSheet';
import { ButtonWrapper, Form, PageContainer, PetNameHighlight, QuestionText } from './index.style';
import { StepPageProps } from './type';

export default function Step3({ goNextStep, enrollPetData, setEnrollData }: StepPageProps) {
  const { isBottomSheetOpen, openBottomSheet, closeBottomSheet } = useBottomSheet('findBreed');
  const openToast = useToastMessage();
  const { isSuccess, data: breeds } = useGetBreedsQuery();
  const [breed, setBreed] = useState<IBreeds | undefined>();

  const { handleSubmit } = useForm();

  const onValidSubmit = () => {
    if (!breed) {
      openToast('견종을 선택해주세요');
      return;
    }
    setEnrollData('breedId', breed.id);
    goNextStep();
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      closeBottomSheet();
    };
  }, []);
  useEffect(() => {
    setEnrollData('breedId', breed?.id);
  }, [breed]);

  useEffect(() => {
    if (isSuccess) {
      const currentBreed = breeds.find((value) => value.id === enrollPetData.breedId);
      setBreed(currentBreed);
    }
  }, [isSuccess]);

  return (
    <PageContainer>
      <div className="mb-4">
        <QuestionText>
          <PetNameHighlight>{enrollPetData.name}</PetNameHighlight>에 대해서 더 알려주세요
        </QuestionText>
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-4">
          <InputStyle
            isError={false}
            className="text-gray-400 text-left p-2 border-b border-b-gray-400"
            onClick={openBottomSheet}
            onChange={(e) => e.preventDefault()}
            placeholder={breed?.id ? breed.name : '품종을 검색해보세요'}
          />

          <div className="flex flex-wrap gap-2 items-center py-2">
            {favBreeds.map((breedChip: IBreeds) => (
              <span
                className={concatClasses(
                  'py-1 px-2 text-sm rounded-lg whitespace-nowrap',
                  breedChip.id === breed?.id
                    ? 'border border-primary-main bg-primary-light text-primary-main'
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
      <BreedBottomSheet
        isOpen={isBottomSheetOpen}
        setBreed={setBreed}
        currentBreedId={enrollPetData.breedId}
      />
    </PageContainer>
  );
}
