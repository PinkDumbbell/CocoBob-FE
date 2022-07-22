/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormButton from '@/components/Form/FormButton';
import { concatClasses } from '@/utils/libs/concatClasses';
import { ButtonWrapper, PageContainer, QuestionText, Form, PetNameHighlight } from './index.style';
import { IPrevNextStep } from './type';

type PetBreedType = {
  breedId: number | null;
  breedName: string;
  breedType: string;
};
export default function Step3({ goPrevStep, goNextStep }: IPrevNextStep) {
  const [selectedPetBreed, setSelectedPetBreed] = useState<PetBreedType | null>(null);
  const { register, handleSubmit } = useForm();

  const onValidSubmit = (data: any) => {
    console.log(data);
    goNextStep();
  };
  return (
    <PageContainer>
      <div>
        <QuestionText>
          <PetNameHighlight>코코</PetNameHighlight>는 어떤 아이인가요?
        </QuestionText>
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-4">
          <input
            className="border-b border-b-2 p-2 pl-8 text-sm"
            type="text"
            placeholder="품종을 검색해보세요"
            value={selectedPetBreed?.breedName}
          />
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
                onClick={() => setSelectedPetBreed(breed)}
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
    </PageContainer>
  );
}
