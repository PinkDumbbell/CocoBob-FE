import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import { RegisterPetInfo } from '.';

import { Button, ButtonWrapper, PageContainer, QuestionText, SubQuestionText } from './index.style';

export interface IBasicInfo {
  petName: string;
  petBreed: string;
  petAge: number;
}
const BasicInformation = ({
  data,
  goNextPage,
}: {
  data: RegisterPetInfo;
  // eslint-disable-next-line no-unused-vars
  goNextPage: (payload: any) => void;
}) => {
  const { register, handleSubmit, setValue } = useForm<IBasicInfo>();

  useEffect(() => {
    const { petName, petBreed, petAge } = data;
    setValue('petName', petName);
    setValue('petBreed', petBreed);
    setValue('petAge', petAge);
  }, []);

  const saveFormInputs = (formInputs: IBasicInfo) => {
    goNextPage(formInputs);
  };

  return (
    <PageContainer>
      <div>
        <QuestionText>아이 이름이 무엇인가요?</QuestionText>
        <SubQuestionText>8자 이내면 저희가 기억하기 쉬울 것 같아요!</SubQuestionText>
        <div>
          <FormInput
            label="이름"
            name="pet-name"
            required
            placeholder="반려동물의 이름을 입력해주세요"
            register={register('petName', {
              required: '이름을 입력해주세요',
            })}
            type="text"
          />
          <FormInput
            label="품종"
            name="pet-breed"
            required
            placeholder="반려동물의 품종을 선택해주세요"
            register={register('petBreed', {
              required: '품종을 선택해주세요',
            })}
            type="text"
          />
          <FormInput
            label="나이"
            name="pet-age"
            required
            placeholder="반려동물의 나이를 입력해주세요"
            register={register('petAge', {
              required: '나이를 입력해주세요',
              setValueAs: (v) => Number(v),
            })}
            type="number"
          />
        </div>
      </div>
      <ButtonWrapper>
        <Button onClick={handleSubmit(saveFormInputs)}>다음으로</Button>
      </ButtonWrapper>
    </PageContainer>
  );
};
export default BasicInformation;
