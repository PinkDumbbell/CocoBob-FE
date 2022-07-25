/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormButton from '@/components/Form/FormButton';
import FormInput, { InputStyle } from '@/components/Form/FormInput';
import { concatClasses } from '@/utils/libs/concatClasses';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeBottomSheetAction,
  selectBottomSheet,
  setBottomSheetAction,
} from '@/store/slices/bottomSheetSlice';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import { breedsMock, favBreedfsMock } from '@/utils/constants/enrollment';
import { IBreeds } from '@/@type/pet';
import { selectRegisterInfo, setRegisterInfo } from '@/store/slices/registerPetSlice';
import { ButtonWrapper, PageContainer, QuestionText, Form, PetNameHighlight } from './index.style';
import { IPrevNextStep } from './type';

export default function Step3({ goPrevStep, goNextStep }: IPrevNextStep) {
  const dispatch = useDispatch();
  const currentBottomSheet = useSelector(selectBottomSheet);
  const registerInfo = useSelector(selectRegisterInfo);

  const [selectedPetBreed, setSelectedPetBreed] = useState<IBreeds | null>(null);
  const { register, handleSubmit, watch, setValue } = useForm();

  const onValidSubmit = (data: any) => {
    if (!selectedPetBreed) {
      alert('견종을 선택해주세요');
      return;
    }
    console.log(data);
    dispatch(
      setRegisterInfo({
        petBreed: selectedPetBreed,
      }),
    );
    goNextStep();
  };

  const onSelectBreedChip = (breed: IBreeds) => {
    setSelectedPetBreed(breed);
  };

  const onSelectBreed = (breed: IBreeds) => {
    setSelectedPetBreed(breed);
    dispatch(closeBottomSheetAction());
  };

  const openSearchBreedSheet = () => dispatch(setBottomSheetAction('findBreed'));

  useEffect(() => {
    setSelectedPetBreed(registerInfo.petBreed);
  }, []);
  useEffect(() => {
    setValue('find-breed', '');
  }, [currentBottomSheet]);
  return (
    <PageContainer>
      <div>
        <QuestionText>
          <PetNameHighlight>코코</PetNameHighlight>는 어떤 아이인가요?
        </QuestionText>
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="text-gray-400 text-left p-2 border-b border-b-gray-400"
            onClick={openSearchBreedSheet}
          >
            {selectedPetBreed?.breedId ? selectedPetBreed.breedName : '품종을 검색해보세요'}
          </button>
          <div className="flex flex-wrap gap-2 items-center">
            {favBreedfsMock.map((breed: IBreeds) => (
              <span
                className={concatClasses(
                  'py-1 px-2 text-sm rounded-lg',
                  breed.breedId === selectedPetBreed?.breedId
                    ? 'border border-primary-900 bg-primary-100 text-primary-900'
                    : 'border',
                )}
                onClick={() => onSelectBreedChip(breed)}
                key={breed.breedId}
              >
                {breed.breedName}
              </span>
            ))}
          </div>
        </div>
        <ButtonWrapper>
          <FormButton name="다음으로" disabled={false} />
        </ButtonWrapper>
      </Form>
      <BottomSheet isOpen={currentBottomSheet === 'findBreed'}>
        <div className="p-4 flex flex-col gap-2">
          <FormInput
            placeholder="품종을 검색해보세요"
            label=""
            name="find-breed"
            rules={register('find-breed')}
          />
          <div className="h-[50vh] px-2 py-3 overflow-y-scroll">
            {!watch('find-breed')
              ? breedsMock.map((breed) => (
                  <div key={breed.breedId} onClick={() => onSelectBreed(breed)}>
                    <p className="py-2">
                      <span className="pr-2 text-primary-900">{breed.breedSize}</span>
                      {breed.breedName}
                    </p>
                  </div>
                ))
              : breedsMock
                  .filter((breed) => breed.breedName.includes(watch('find-breed')))
                  .map((breed) => (
                    <div key={breed.breedId} onClick={() => onSelectBreed(breed)}>
                      <p className="py-2">
                        <span className="pr-2 text-primary-900">{breed.breedSize}</span>
                        {breed.breedName}
                      </p>
                    </div>
                  ))}
          </div>
          <Button label="선택 완료" />
        </div>
      </BottomSheet>
    </PageContainer>
  );
}
