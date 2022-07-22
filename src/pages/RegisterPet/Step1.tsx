/* eslint-disable no-unused-vars */
import Button from '@/components/Button';
import FormButton from '@/components/Form/FormButton';
import FormInput from '@/components/Form/FormInput';
import { concatClasses } from '@/utils/libs/concatClasses';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ButtonWrapper, PageContainer, QuestionText, SubQuestionText, Form } from './index.style';
import { INextStep } from './type';

interface IStep1Form {
  petName: string;
  petSex: 'male' | 'female' | '';
}
export default function Step1({ goNextStep }: INextStep) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IStep1Form>();

  console.log(watch());

  const onValidSubmit = (data: IStep1Form) => {
    console.log(data);

    goNextStep();
  };

  return (
    <PageContainer>
      <div>
        <QuestionText>함께하는 아이에 대해 알고싶어요!</QuestionText>
        {/* <SubQuestionText>8자 이내면 저희가 기억하기 쉬울 것 같아요!</SubQuestionText> */}
      </div>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="flex flex-col gap-6">
          <FormInput
            label="이름"
            name="pet-name"
            placeholder="반려동물의 이름을 입력해주세요"
            register={register('petName', {
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
        </div>
        <ButtonWrapper>
          <FormButton name="다음으로" disabled={false} />
        </ButtonWrapper>
      </Form>
    </PageContainer>
  );
}
