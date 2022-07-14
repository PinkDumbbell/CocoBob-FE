import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';
import { setBasicInfo } from '@/store/slices/registerPetSlice';
import { RootState } from '@/store/config';

import { ButtonWrapper, PageContainer, QuestionText, SubQuestionText } from './index.style';

export interface IBasicInfo {
  petName: string;
  petBreed: string;
  petAge: number;
}
const BasicInformation = ({
  goNextPage,
}: {
  // eslint-disable-next-line no-unused-vars
  goNextPage: () => void;
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, watch } = useForm<IBasicInfo>();
  const currentPetInformation = useSelector((state: RootState) => state.registerPet);

  useEffect(() => {
    const { petName, petBreed, petAge } = currentPetInformation;
    setValue('petName', petName);
    setValue('petBreed', petBreed);
    setValue('petAge', petAge);
  }, [currentPetInformation]);

  const saveFormInputs = (formInputs: IBasicInfo) => {
    console.log('next');
    dispatch(setBasicInfo(formInputs));
    goNextPage();
  };

  const isButtonDisabled = !watch(['petName', 'petAge', 'petBreed']).every((value) => value);

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
        <FormButton
          onClick={handleSubmit(saveFormInputs)}
          name="다음으로"
          disabled={isButtonDisabled}
        />
      </ButtonWrapper>
    </PageContainer>
  );
};
export default BasicInformation;
