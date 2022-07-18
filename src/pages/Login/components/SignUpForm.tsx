/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import FormButton from '@/components/Form/FormButton';
import FormInput from '@/components/Form/FormInput';
import { useSignUpMutation } from '@/store/api/userApi';
import { setBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import { checkEmailDuplicated } from '../api';
import { FormContainer } from './SignUpForm.style';
import { ISignUpForm } from '../types';

export default function SignUpForm({ isOpen }: { isOpen: boolean }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    getValues,
    setError,
    watch,
  } = useForm<ISignUpForm>();
  const [signUp, { error }] = useSignUpMutation();

  const [emailChecked, setEmailChecked] = useState<string>('');

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const openEmailLoginSheet = () => dispatch(setBottomSheetAction('emailLogin'));

  const onClickSignUp = async (data: ISignUpForm) => {
    if (!emailChecked || data.email !== emailChecked) {
      console.log('email check 안됨');
    }
    await signUp(data);
    if (error) {
      console.log(error);
      return;
    }

    openEmailLoginSheet();
  };

  const checkEmail = async () => {
    const emailValue = getValues('email');
    if (!emailValue) return;
    const result = await trigger('email');
    if (!result) return;

    const response = await checkEmailDuplicated(emailValue);
    if (!response || !response.isAvailable) {
      setEmailChecked('');
      return;
    }

    setEmailChecked(emailValue);
  };

  useEffect(() => {
    if (isOpen) return;

    reset();
    setEmailChecked('');
  }, [isOpen]);

  return (
    <FormContainer onSubmit={handleSubmit(onClickSignUp)}>
      <FormInput
        label="이름"
        name="signup-username"
        required={true}
        type="text"
        placeholder="이름을 입력하세요"
        register={register('username', { required: true })}
        isError={!!errors.username}
        errorMessage={errors.username?.message}
      />

      <div className="flex items-center w-full gap-2">
        <div className="w-10/12">
          <FormInput
            label="이메일"
            name="signup-email"
            required={true}
            type="text"
            placeholder="이메일을 입력하세요"
            onChange={() => setEmailChecked('')}
            register={register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
            isError={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="w-2/12 h-12 flex justify-center items-center pt-7">
          {emailChecked ? (
            <div className="h-12 w-12 bg-green-400 text-white flex items-center justify-center text-2xl rounded-full">
              V
            </div>
          ) : (
            <button className="h-12 w-12 border border-red-500 rounded-lg " onClick={checkEmail}>
              확인
            </button>
          )}
        </div>
      </div>
      <FormInput
        label="비밀번호"
        name="signup-password"
        required={true}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        register={register('password', {
          required: true,
          pattern: {
            value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            message: '영어 대소문자, 숫자, 특수문자를 포함해야합니다.',
          },
        })}
        isError={!!errors.password}
        errorMessage={errors.password?.message}
      />

      <FormInput
        label="비밀번호 확인"
        name="signup-passwordConfirm"
        required={true}
        type="password"
        placeholder="비밀번호를 확인해주세요"
        register={register('passwordConfirm', {
          required: true,
          validate: (value) => {
            if (value !== password) {
              setError('passwordConfirm', {
                message: '비밀번호가 일치하지 않습니다.',
              });
              return '비밀번호가 일치하지 않습니다.';
            }
            return undefined;
          },
          pattern: {
            value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            message: '영어 대소문자, 숫자, 특수문자를 포함해야합니다.',
          },
        })}
        isError={password !== passwordConfirm || !!errors.passwordConfirm}
        errorMessage={errors.passwordConfirm?.message}
      />

      <FormButton name="회원가입" disabled={false} />
    </FormContainer>
  );
}
