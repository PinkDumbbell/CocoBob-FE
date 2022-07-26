/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import FormButton from '@/components/Form/FormButton';
import FormInput from '@/components/Form/FormInput';
import { concatClasses } from '@/utils/libs/concatClasses';
import { selectRegisterInfo, setRegisterInfo } from '@/store/slices/registerPetSlice';
import { PetSexType } from '@/@type/pet';
import useSelectImage from '@/utils/hooks/useSelectImage';
import { ButtonWrapper, PageContainer, QuestionText, Form, QuestionWrapper } from './index.style';
import { INextStep } from './type';

interface IStep1Form {
  name: string;
  sex: PetSexType;
  isSpayed: boolean;
  isPregnant: boolean;
}
export default function Step1({ goNextStep }: INextStep) {
  const dispatch = useDispatch();
  const registerInfo = useSelector(selectRegisterInfo);
  const { imageFile: petImage, handleChangeImage } = useSelectImage({
    initImageFile: registerInfo.petImage,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IStep1Form>();

  const onValidSubmit = (submitData: IStep1Form) => {
    const { name, sex, isSpayed, isPregnant } = submitData;

    dispatch(setRegisterInfo({ petImage, name, sex, isSpayed, isPregnant }));
    goNextStep();
  };

  useEffect(() => {
    if (!registerInfo) return;
    console.log(registerInfo);
    setValue('name', registerInfo.name);
    setValue('sex', registerInfo.sex);
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
          <div className="flex flex-col items-center justify-center">
            <div className="relative felx items-center justify-center">
              <label
                className="absolute bottom-2 right-2 h-8 w-8 bg-primary-900 rounded-md"
                htmlFor="pet-thumbnail"
              ></label>
              <img
                alt=""
                src={petImage}
                className="bg-gray-200 h-32 w-32 rounded-full overflow-hidden"
              />
            </div>
            <input
              type="file"
              id="pet-thumbnail"
              accept="image/jpg, image/png, image/jpeg"
              onChange={handleChangeImage}
            />
          </div>
          <FormInput
            label="이름"
            name="pet-name"
            placeholder="반려동물의 이름을 입력해주세요"
            rules={register('name', {
              required: '이름을 입력해주세요',
              maxLength: 20,
            })}
            type="text"
            isError={!!errors.name?.message}
            errorMessage={errors.name?.message}
          />
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
