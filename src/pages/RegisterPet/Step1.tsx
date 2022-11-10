import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormButton } from '@/components/Form';
import { ButtonWrapper, Form, PageContainer, QuestionText, SubQuestionText } from './index.style';
import { StepPageProps } from './type';

interface Step1Form {
  name: string;
}
export default function Step1({ goNextStep, enrollPetData, setEnrollData }: StepPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<Step1Form>();

  const isButtonDisabled = !watch('name');
  const onSubmitForm = ({ name }: Step1Form) => {
    setEnrollData('name', name);
    goNextStep();
  };

  useEffect(() => {
    if (!enrollPetData.name) return;
    setValue('name', enrollPetData.name);
  }, []);

  return (
    <PageContainer>
      <div className="flex flex-col gap-5 h-full">
        <div>
          <QuestionText>이름이 어떻게 되나요?</QuestionText>
          <SubQuestionText>되도록 10자 이내였으면 좋겠어요!</SubQuestionText>
        </div>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormInput
            label=""
            type="text"
            name="pet-name"
            errorMessage={errors.name?.message}
            placeholder="반려동물의 이름을 입력해주세요"
            rules={register('name', {
              required: '이름을 입력해주세요',
              maxLength: {
                value: 20,
                message: '너무 긴 이름 같아요!',
              },
              onChange: () => {
                trigger('name');
              },
            })}
            isError={!!errors.name?.message}
          />
          <ButtonWrapper>
            <FormButton name="다음으로" disabled={isButtonDisabled || !!errors.name?.message} />
          </ButtonWrapper>
        </Form>
      </div>
    </PageContainer>
  );
}
