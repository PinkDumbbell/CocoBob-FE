import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { PetSexType } from '@/@type/pet';
import { FormInput, FormButton } from '@/components/Form';
import ActivityLevelSelector, { useSelectActivityLevel } from '@/components/ActivitySelector';
import { concatClasses } from '@/utils/libs/concatClasses';
import { ReactComponent as MaleIcon } from '@/assets/icon/male_icon.svg';
import { ReactComponent as FemaleIcon } from '@/assets/icon/female_icon.svg';
import {
  PageContainer,
  QuestionText,
  Form,
  PetNameHighlight,
  ButtonWrapper,
  QuestionWrapper,
} from './index.style';
import { StepPageProps } from './type';

interface Step4Form {
  activityLevel: number;
  sex: PetSexType;
  isSpayed: boolean;
  isPregnant: boolean;
  bodyWeight: number;
}

export default function Step5({ goNextStep, enrollPetData, setEnrollData }: StepPageProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Step4Form>();

  const { selectedActivityLevel, handleSelectActivityLevel } = useSelectActivityLevel(
    enrollPetData?.activityLevel ?? 3,
  );

  const isButtonDisabled = !watch(['bodyWeight', 'sex']).every((value) => value);

  const saveFormInputs = (formInputs: any) => {
    const { bodyWeight, sex, isSpayed, isPregnant } = formInputs;

    setEnrollData('bodyWeight', bodyWeight);
    setEnrollData('activityLevel', selectedActivityLevel);
    setEnrollData('sex', sex);
    setEnrollData('isSpayed', isSpayed);
    setEnrollData('isPregnant', isPregnant);
    goNextStep();
  };

  useEffect(() => {
    if (enrollPetData) {
      setValue('sex', enrollPetData.sex);
      setValue('isSpayed', enrollPetData.isSpayed);
      setValue('isPregnant', enrollPetData.isPregnant);
      setValue('bodyWeight', enrollPetData.bodyWeight);
    }
  }, [enrollPetData]);

  return (
    <PageContainer>
      <div className="mb-main">
        <QuestionText>
          <PetNameHighlight>{enrollPetData.name}</PetNameHighlight>에 대해서 더 알려주시겠어요?
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
                    'py-sm cursor-pointer gap-2 border border-secondary-brightest rounded-md w-full flex items-center justify-center',
                    watch('sex') === 'MALE' ? 'bg-primary-max  text-primary' : '',
                  )}
                >
                  <MaleIcon
                    width={14}
                    height={14}
                    fill={watch('sex') === 'MALE' ? '#1f80ee' : '#999'}
                  />
                  <span className="text-p">남자</span>
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
                    'py-sm cursor-pointer gap-2 border border-secondary-brightest rounded-md w-full flex items-center justify-center',
                    watch('sex') === 'FEMALE' ? 'bg-primary-max text-primary' : '',
                  )}
                >
                  <FemaleIcon
                    width={14}
                    height={14}
                    fill={watch('sex') === 'FEMALE' ? '#1f80ee' : '#999'}
                  />
                  <span className="text-p">여자</span>
                </label>
              </div>
            </div>
            <p className="text-bad text-caption">{errors.sex?.message}</p>
          </div>
          <FormInput
            label="몸무게"
            name="bodyWeight"
            unit="KG"
            type="text"
            errorMessage={errors.bodyWeight?.message}
            typing={Boolean(watch('bodyWeight'))}
            placeholder="몸무게를 입력해주세요"
            isError={!!errors.bodyWeight?.message}
            rules={register('bodyWeight', {
              required: true,
              pattern: {
                value: /^[\d]*\.?[\d]{0,8}$/,
                message: '숫자를 입력하세요.',
              },
              onChange: () => {
                trigger('bodyWeight');
              },
              validate: {
                maxLength: () => {
                  const { bodyWeight } = getValues();

                  return bodyWeight.toString().length < 9 || '8자리 이상 입력하실 수 없습니다.';
                },
              },
            })}
          />
          <div className="flex flex-col gap-2">
            <p className="font-medium text-label">활동수준</p>
            <ActivityLevelSelector
              activityLevel={selectedActivityLevel}
              handleSelectLevel={handleSelectActivityLevel}
            />
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
          <FormButton name="등록완료" disabled={isButtonDisabled} />
        </ButtonWrapper>
      </Form>
    </PageContainer>
  );
}
