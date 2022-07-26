/* eslint-disable no-unused-vars */
import { ActivityLevelType } from '@/@type/pet';
import FormButton from '@/components/Form/FormButton';
import FormInput from '@/components/Form/FormInput';
import { useAppDispatch } from '@/store/config';
import { selectRegisterInfo, setRegisterInfo } from '@/store/slices/registerPetSlice';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { PageContainer, QuestionText, Form, PetNameHighlight, ButtonWrapper } from './index.style';
import { IPrevNextStep } from './type';

export default function Step4({ goPrevStep, goNextStep }: IPrevNextStep) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue, watch } = useForm();
  const currentPetInformation = useSelector(selectRegisterInfo);

  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    currentPetInformation?.activityLevel ?? 3,
  );

  const isButtonDisabled = !watch(['bodyWeight']).every((value) => value);

  const saveFormInputs = (formInputs: any) => {
    const { bodyWeight } = formInputs;

    const detailData = {
      bodyWeight,
      activityLevel: selectedActivityLevel,
    };
    dispatch(setRegisterInfo(detailData));
    goNextStep();
  };

  useEffect(() => {
    if (currentPetInformation.bodyWeight) {
      setValue('bodyWeight', currentPetInformation.bodyWeight);
    }
  }, [currentPetInformation]);

  const handleSelectActivityLevel = (level: ActivityLevelType) => {
    setSelectedActivityLevel(level);
  };

  return (
    <PageContainer>
      <div>
        <QuestionText>
          <PetNameHighlight>{'코코'}</PetNameHighlight>에 대해서 더 알려주시겠어요?
        </QuestionText>{' '}
      </div>
      <Form onSubmit={handleSubmit(saveFormInputs)}>
        <div className="flex flex-col gap-4">
          <FormInput
            label="몸무게"
            name="bodyWeight"
            placeholder="몸무게를 입력해주세요"
            rules={register('bodyWeight', {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: '숫자를 입력해주세요',
              },
            })}
            type="text"
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
          <FormButton name="다음으로" disabled={isButtonDisabled} />
        </ButtonWrapper>
      </Form>
    </PageContainer>
  );
}
