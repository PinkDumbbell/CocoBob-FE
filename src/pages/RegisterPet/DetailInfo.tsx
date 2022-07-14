/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import { ActivityLevelType } from '@/@type/pet';
import FormButton from '@/components/Form/FormButton';
import { setDetailInfo } from '@/store/slices/registerPetSlice';
import { RootState } from '@/store/config';
import {
  ButtonWrapper,
  PageContainer,
  PetNameHighlight,
  PrevPageButton,
  QuestionText,
  QuestionWrapper,
} from './index.style';

interface IDetailFormInputs {
  bodyWeight: number;
}
export interface IDetailInfo extends IDetailFormInputs {
  spayed: boolean;
  pregnant: boolean;
  activityLevel: ActivityLevelType;
}
const DetailInformation = ({
  goNextPage,
  goPrevPage,
}: {
  goNextPage: () => void;
  goPrevPage: () => void;
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues, setValue, watch } = useForm<IDetailFormInputs>();
  const currentPetInformation = useSelector((state: RootState) => state.registerPet);

  const [isSpayed, setIsSpayed] = useState(currentPetInformation.spayed);
  const [isPregnant, setIsPregnant] = useState(currentPetInformation.pregnant);
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    currentPetInformation?.activityLevel ?? 3,
  );

  const isButtonDisabled = !watch(['bodyWeight']).every((value) => value);

  const saveFormInputs = (formInputs: IDetailFormInputs) => {
    const { bodyWeight } = formInputs;

    const detailData = {
      bodyWeight,
      spayed: isSpayed,
      pregnant: isPregnant,
      activityLevel: selectedActivityLevel,
    };
    dispatch(setDetailInfo(detailData));
    goNextPage();
  };

  const onClickGoPrevPage = () => {
    const bodyWeight = getValues('bodyWeight');

    const detailData = {
      bodyWeight,
      spayed: isSpayed,
      pregnant: isPregnant,
      activityLevel: selectedActivityLevel,
    };
    dispatch(setDetailInfo(detailData));
    goPrevPage();
  };

  useEffect(() => {
    if (currentPetInformation.bodyWeight) {
      setValue('bodyWeight', currentPetInformation.bodyWeight);
    }
  }, [currentPetInformation]);
  useEffect(() => {
    console.log(currentPetInformation);
  }, []);
  const handleSelectActivityLevel = (level: ActivityLevelType) => {
    setSelectedActivityLevel(level);
  };

  return (
    <PageContainer>
      <div>
        <QuestionText>
          <PetNameHighlight>{currentPetInformation.petName}</PetNameHighlight>에 대해서 더
          알려주시겠어요?
        </QuestionText>
        <QuestionWrapper>
          <input
            type="checkbox"
            name=""
            id="spayed"
            checked={isSpayed}
            onChange={({ target: { checked } }) => setIsSpayed(checked)}
          />
          <label htmlFor="spayed">중성화를 했나요?</label>
        </QuestionWrapper>
        <QuestionWrapper>
          <input
            type="checkbox"
            name=""
            id="pregnant"
            checked={isPregnant}
            onChange={({ target: { checked } }) => setIsPregnant(checked)}
          />
          <label htmlFor="spayed">임신/수유 중인가요?</label>
        </QuestionWrapper>
        <FormInput
          label="몸무게"
          name="bodyWeight"
          required
          placeholder="몸무게를 입력해주세요"
          register={register('bodyWeight', {
            required: true,
            setValueAs: (v) => Number(v),
          })}
          type="number"
        />
        <div>
          <p>활동수준</p>
          <input
            type="radio"
            name="1"
            id="activity-level-1"
            value={1}
            checked={selectedActivityLevel === 1}
            onChange={() => handleSelectActivityLevel(1)}
          />
          <input
            type="radio"
            name="2"
            id="activity-level-2"
            value={2}
            checked={selectedActivityLevel === 2}
            onChange={() => handleSelectActivityLevel(2)}
          />
          <input
            type="radio"
            name="3"
            id="activity-level-3"
            value={3}
            checked={selectedActivityLevel === 3}
            onChange={() => handleSelectActivityLevel(3)}
          />
          <input
            type="radio"
            name="4"
            id="activity-level-4"
            value={4}
            checked={selectedActivityLevel === 4}
            onChange={() => handleSelectActivityLevel(4)}
          />
          <input
            type="radio"
            name="5"
            id="activity-level-5"
            value={5}
            checked={selectedActivityLevel === 5}
            onChange={() => handleSelectActivityLevel(5)}
          />
        </div>
      </div>

      <ButtonWrapper>
        <PrevPageButton onClick={onClickGoPrevPage}>이전으로</PrevPageButton>
        <FormButton
          name="다음으로"
          onClick={handleSubmit(saveFormInputs)}
          disabled={isButtonDisabled}
        />
      </ButtonWrapper>
    </PageContainer>
  );
};
export default DetailInformation;
