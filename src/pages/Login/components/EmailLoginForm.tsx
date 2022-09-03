import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormButton } from '@/components/Form';
import { ILoginForm } from '../types';
import { LoginForm } from './EmailLoginForm.style';

interface EmailLoginFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmitCredentials: (data: ILoginForm) => void;
  isError: boolean;
  isLoading: boolean;
}
export default function EmailLoginForm({
  onSubmitCredentials,
  isError,
  isLoading,
}: EmailLoginFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>();

  useEffect(() => {
    if (!isError) return;
    reset();
  }, [isError]);

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
