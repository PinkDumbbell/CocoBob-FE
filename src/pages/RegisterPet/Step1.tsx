/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import FormButton from '@/components/Form/FormButton';
import FormInput from '@/components/Form/FormInput';
import { concatClasses } from '@/utils/libs/concatClasses';
import { selectRegisterInfo, setRegisterInfo } from '@/store/slices/registerPetSlice';
import { ButtonWrapper, PageContainer, QuestionText, Form, QuestionWrapper } from './index.style';
import { INextStep } from './type';

interface IStep1Form {
  petName: string;
  petSex: 'male' | 'female' | '';
  isSpayed: boolean;
  isPregnant: boolean;
}
export default function Step1({ goNextStep }: INextStep) {
  const dispatch = useDispatch();
  const registerInfo = useSelector(selectRegisterInfo);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IStep1Form>();

  const onValidSubmit = (submitData: IStep1Form) => {
    const { petName, petSex, isSpayed, isPregnant } = submitData;

    dispatch(setRegisterInfo({ petName, petSex, isSpayed, isPregnant }));
    goNextStep();
  };

  useEffect(() => {
    if (!registerInfo) return;
    console.log(registerInfo);
    setValue('petName', registerInfo.petName);
    setValue('petSex', registerInfo.petSex);
    setValue('isSpayed', registerInfo.isSpayed);
    setValue('isPregnant', registerInfo.isPregnant);
  }, []);

  return (
    <PageContainer>
      <div>
        <QuestionText>함께하는 아이에 대해 알고싶어요!</QuestionText>
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <label className="relative h-32 w-32 rounded-full bg-gray-400" htmlFor="pet-thumbnail">
              <div className="absolute bottom-2 right-2 h-8 w-8 bg-primary-900 rounded-md"></div>
            </label>
            <input type="file" id="pet-thumbnail" accept="image/jpg, image/png, image/jpeg" />
          </div>
          <FormInput
            label="이름"
            name="pet-name"
            placeholder="반려동물의 이름을 입력해주세요"
            rules={register('petName', {
              required: '이름을 입력해주세요',
              maxLength: 20,
            })}
            type="text"
            isError={!!errors.petName?.message}
            errorMessage={errors.petName?.message}
          />
          <div>
            <div className="flex gap-1 items-center mb-2">
              <div className="flex-1 text-center w-1/2">
                <input
                  type="radio"
                  className="hidden"
                  value="male"
                  id="pet-sex-man"
                  {...register('petSex', { required: '성별을 선택해주세요' })}
                />
                <label
                  htmlFor="pet-sex-man"
                  className={concatClasses(
                    'border border-primary-900 rounded-md w-full block',
                    watch('petSex') === 'male' ? 'bg-primary-100 text-primary-900' : '',
                  )}
                >
                  남자
                </label>
              </div>
              <div className="flex-1 text-center w-1/2">
                <input
                  type="radio"
                  className="hidden"
                  value="female"
                  id="pet-sex-woman"
                  {...register('petSex', { required: '성별을 선택해주세요' })}
                />
                <label
                  htmlFor="pet-sex-woman"
                  className={concatClasses(
                    'border border-primary-900 rounded-md w-full block',
                    watch('petSex') === 'female' ? 'bg-primary-100 text-primary-900' : '',
                  )}
                >
                  여자
                </label>
              </div>
            </div>
            <p className="text-primary-900 text-sm">{errors.petSex?.message}</p>
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
          <FormButton name="다음으로" disabled={false} />
        </ButtonWrapper>
      </Form>
    </PageContainer>
  );
}
