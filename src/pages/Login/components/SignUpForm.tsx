/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormButton } from '@/components/Form';

import useToastMessage from '@/utils/hooks/useToastMessage';
import { checkEmailDuplicated } from '../api';
import {
  CheckEmailButton,
  EmailCheckButtonWrapper,
  EmailChecked,
  EmailInputStyle,
  EmailInputWrapper,
  FormContainer,
} from './SignUpForm.style';
import { ISignUpForm } from '../types';

export default function SignUpForm({
  isOpen,
  signUp,
}: {
  isOpen: boolean;
  signUp: (data: ISignUpForm) => void;
}) {
  const openToast = useToastMessage();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset: formReset,
    getValues,
    setError,
    watch,
  } = useForm<ISignUpForm>();

  const [emailChecked, setEmailChecked] = useState<string>('');

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const isEmailDuplicatedChecked = (submitEmail: string) => {
    if (!emailChecked || submitEmail !== emailChecked) {
      openToast('이메일 중복체크가 필요합니다.');
      return false;
    }
    return true;
  };

  const onClickSignUp = async (data: ISignUpForm) => {
    if (!isEmailDuplicatedChecked(data.email)) return;
    signUp(data);
  };

  const checkEmail = async () => {
    const emailValue = getValues('email');
    const result = await trigger('email');
    if (!emailValue || !result) return;

    const fetchResult = await checkEmailDuplicated(emailValue);
    if (!fetchResult) {
      openToast('에러가 발생하였습니다.');
      return;
    }

    if (!fetchResult.isAvailable) {
      setError('email', { message: fetchResult.message }, { shouldFocus: true });
      setEmailChecked('');
      return;
    }
    setEmailChecked(emailValue);
  };

  useEffect(() => {
    if (isOpen) return;

    formReset();
    setEmailChecked('');
  }, [isOpen]);

  return (
    <FormContainer data-testid="signup-form" onSubmit={handleSubmit(onClickSignUp)}>
      <FormInput
        label="이름"
        name="signup-username"
        type="text"
        placeholder="이름을 입력하세요"
        rules={register('username', { required: true })}
        isError={!!errors.username}
        errorMessage={errors.username?.message}
      />

      <EmailInputWrapper>
        <EmailInputStyle>
          <FormInput
            label="이메일"
            name="signup-email"
            type="text"
            placeholder="이메일을 입력하세요"
            rules={register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식이 올바르지 않습니다.',
              },
              onChange: () => setEmailChecked(''),
            })}
            isError={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </EmailInputStyle>
        <EmailCheckButtonWrapper>
          {emailChecked ? (
            <EmailChecked>V</EmailChecked>
          ) : (
            <CheckEmailButton type="button" onClick={checkEmail}>
              확인
            </CheckEmailButton>
          )}
        </EmailCheckButtonWrapper>
      </EmailInputWrapper>
      <FormInput
        label="비밀번호"
        name="signup-password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        rules={register('password', {
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
        type="password"
        placeholder="비밀번호를 확인해주세요"
        rules={register('passwordConfirm', {
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
