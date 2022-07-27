/* eslint-disable no-unused-vars */
import { ActivityLevelType, PetSexType } from '@/@type/pet';
import FormButton from '@/components/Form/FormButton';
import FormInput from '@/components/Form/FormInput';
import { useAppDispatch } from '@/store/config';
import { selectRegisterInfo, setRegisterInfo } from '@/store/slices/registerPetSlice';
import { concatClasses } from '@/utils/libs/concatClasses';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  PageContainer,
  QuestionText,
  Form,
  PetNameHighlight,
  ButtonWrapper,
  QuestionWrapper,
} from './index.style';
import { IPrevNextStep } from './type';

interface Step4Form {
  activityLevel: number;
  sex: PetSexType;
  isSpayed: boolean;
  isPregnant: boolean;
  bodyWeight: number;
}

const activityLevels: ActivityLevelType[] = [1, 2, 3, 4, 5];
export default function Step5({ goPrevStep, goNextStep }: IPrevNextStep) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step4Form>();
  const registerInfo = useSelector(selectRegisterInfo);

  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    registerInfo?.activityLevel ?? 3,
  );

  const isButtonDisabled = !watch(['bodyWeight', 'sex']).every((value) => value);

  const saveFormInputs = (formInputs: any) => {
    const { bodyWeight, sex, isSpayed, isPregnant } = formInputs;

    const detailData = {
      bodyWeight,
      activityLevel: selectedActivityLevel,
      sex,
      isSpayed,
      isPregnant,
    };
    dispatch(setRegisterInfo(detailData));
    goNextStep();
  };

  useEffect(() => {
    if (registerInfo) {
      setValue('sex', registerInfo.sex);
      setValue('isSpayed', registerInfo.isSpayed);
      setValue('isPregnant', registerInfo.isPregnant);
      setValue('bodyWeight', registerInfo.bodyWeight);
    }
  }, [registerInfo]);

  const handleSelectActivityLevel = (level: ActivityLevelType) => {
    setSelectedActivityLevel(level);
  };

  return (
    <PageContainer>
      <div className="mb-4">
        <QuestionText>
          <PetNameHighlight>{'코코'}</PetNameHighlight>에 대해서 더 알려주시겠어요?
        </QuestionText>
      </div>
      <Form onSubmit={handleSubmit(saveFormInputs)}>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex gap-1 items-center mb-2">
              <div className="flex-1 text-center w-1/2">
                <input
                  type="radio"
                  className="hidden"
                  value="MALE"
                  id="pet-sex-man"
                  {...register('sex', { required: '성별을 선택해주세요' })}
                />
                <label
                  htmlFor="pet-sex-man"
                  className={concatClasses(
                    'border border-primary-900 rounded-md w-full block',
                    watch('sex') === 'MALE' ? 'bg-primary-100 text-primary-900' : '',
                  )}
                >
                  남자
                </label>
              </div>
              <div className="flex-1 text-center w-1/2">
                <input
                  type="radio"
                  className="hidden"
                  value="FEMALE"
                  id="pet-sex-woman"
                  {...register('sex', { required: '성별을 선택해주세요' })}
                />
                <label
                  htmlFor="pet-sex-woman"
                  className={concatClasses(
                    'border border-primary-900 rounded-md w-full block',
                    watch('sex') === 'FEMALE' ? 'bg-primary-100 text-primary-900' : '',
                  )}
                >
                  여자
                </label>
              </div>
            </div>
            <p className="text-primary-900 text-sm">{errors.sex?.message}</p>
          </div>
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
          <div className="flex flex-col gap-2">
            <p>활동수준</p>
            <div className="flex gap-4">
              {activityLevels.map((value) => (
                <input
                  key={value}
                  type="radio"
                  name={String(value)}
                  id={`activity-level-${value}`}
                  value={value}
                  checked={value === selectedActivityLevel}
                  onChange={() => handleSelectActivityLevel(value)}
                />
              ))}
            </div>
          </div>

          <div>
            <QuestionWrapper>
              <input type="checkbox" id="spayed" {...register('isSpayed')} />
              <label htmlFor="spayed">중성화를 했나요?</label>
            </QuestionWrapper>
            <QuestionWrapper>
              <input type="checkbox" id="pregnant" {...register('isPregnant')} />
              <label htmlFor="pregnant">임신/수유 중인가요?</label>
            </QuestionWrapper>
          </div>
        </div>
        <ButtonWrapper>
          <FormButton name="다음으로" disabled={isButtonDisabled} />
        </ButtonWrapper>
      </Form>
    </PageContainer>
  );
}
