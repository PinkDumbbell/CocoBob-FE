/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormButton from '@/components/Form/FormButton';
import FormInput, { InputStyle } from '@/components/Form/FormInput';
import { concatClasses } from '@/utils/libs/concatClasses';
import { useDispatch, useSelector } from 'react-redux';
import { selectBottomSheet, setBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import { IPrevNextStep } from './type';
import { ButtonWrapper, PageContainer, QuestionText, Form, PetNameHighlight } from './index.style';

type PetBreedType = {
  breedId: number | null;
  breedName: string;
  breedType: string;
};
export default function Step3({ goPrevStep, goNextStep }: IPrevNextStep) {
  const dispatch = useDispatch();
  const currentBottomSheet = useSelector(selectBottomSheet);

  const [selectedPetBreed, setSelectedPetBreed] = useState<PetBreedType | null>(null);
  const { register, handleSubmit } = useForm();

  const onValidSubmit = (data: any) => {
    console.log(data);
    goNextStep();
  };

  const onSelectBreedChip = (breed: any) => {
    setSelectedPetBreed(breed);
  };

  const openSearchBreedSheet = () => dispatch(setBottomSheetAction('findBreed'));
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
            품종을 검색해보세요
          </button>
          <div className="flex flex-wrap gap-2 items-center">
            {[
              { breedId: 1, breedName: '말티즈', breedType: '소형견' },
              { breedId: 2, breedName: '토이 푸들', breedType: '소형견' },
              { breedId: 3, breedName: '포메라니안', breedType: '소형견' },
              { breedId: 4, breedName: '비숑 프리제', breedType: '중형견' },
              { breedId: 5, breedName: '시츄', breedType: '소형견' },
              { breedId: 6, breedName: '요크셔테리어', breedType: '소형견' },
              { breedId: 7, breedName: '치와와', breedType: '소형견' },
              { breedId: 8, breedName: '골든 리트리버', breedType: '대형견' },
            ].map((breed) => (
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
          <div className="h-[50vh] px-4 py-3 overflow-y-scroll">
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
            <div className="h-8">품종 이름</div>
          </div>
          <Button label="선택 완료" />
        </div>
      </BottomSheet>
    </PageContainer>
  );
}
