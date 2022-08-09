import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormInput from '@/components/Form/FormInput';
import { useLoginMutation } from '@/store/api/userApi';
import FormButton from '@/components/Form/FormButton';
import useToastMessage from '@/utils/hooks/useToastMessage';
import { ILoginForm } from '../types';
import { LoginForm } from './EmailLoginForm.style';

interface EmailLoginFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmitCredentials: (data: ILoginForm) => void;
}
export default function EmailLoginForm({ onSubmitCredentials }: EmailLoginFormProps) {
  // eslint-disable-next-line no-unused-vars
  const [login, { isLoading, error, reset: mutationReset }] = useLoginMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset: formReset,
  } = useForm<ILoginForm>();

  const openToast = useToastMessage();
  useEffect(() => {
    if (!error) return;
    const {
      status,
      data: { code, message },
    } = error as { status: number; data: any };

    if (status === 404 && code === 'USER_NOT_FOUND') {
      openToast('이메일 또는 비밀번호를 확인해주세요.');
      formReset();
      mutationReset();
    } else {
      openToast(message);
      formReset();
      mutationReset();
    }
  }, [error]);

  return (
    <LoginForm data-testid="login-form" onSubmit={handleSubmit(onSubmitCredentials)}>
      <FormInput
        label="이메일"
        name="email"
        type="text"
        placeholder="이메일을 입력하세요"
        rules={register('email', { required: true })}
        isError={!!errors.email}
      />
      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        rules={register('password', { required: true })}
        isError={!!errors.password}
      />
      <FormButton name={!isLoading ? '로그인' : '로그인 중...'} disabled={isLoading} />
    </LoginForm>
  );
}
