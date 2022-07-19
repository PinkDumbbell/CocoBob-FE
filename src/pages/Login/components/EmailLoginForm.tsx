import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FormInput from '@/components/Form/FormInput';
import { closeBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import { useLoginMutation } from '@/store/api/userApi';
import FormButton from '@/components/Form/FormButton';
import { selectUserId } from '@/store/slices/authSlice';
import { ILoginForm } from '../types';
import { LoginForm } from './EmailLoginForm.style';

export default function EmailLoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const [login, { isLoading, error, reset: mutationReset }] = useLoginMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset: formReset,
  } = useForm<ILoginForm>();

  const onSubmitLoginForm = async (data: ILoginForm) => {
    await login(data);
  };

  useEffect(() => {
    if (!error) return;
    const {
      status,
      data: { code },
    } = error as { status: number; data: any };

    if (status === 404 && code === 'USER_NOT_FOUND') {
      alert('이메일 또는 비밀번호를 확인해주세요.');
      formReset();
      mutationReset();
    }
  }, [error]);

  useEffect(() => {
    if (!userId) return;

    dispatch(closeBottomSheetAction);
    navigate('/');
  }, [userId]);

  return (
    <LoginForm onSubmit={handleSubmit(onSubmitLoginForm)}>
      <FormInput
        label="이메일"
        name="email"
        required={true}
        type="text"
        placeholder="이메일을 입력하세요"
        register={register('email', { required: true })}
        isError={!!errors.email}
      />
      <FormInput
        label="비밀번호"
        name="password"
        required={true}
        type="password"
        placeholder="비밀번호를 입력하세요"
        register={register('password', { required: true })}
        isError={!!errors.password}
      />

      <FormButton name={!isLoading ? '로그인' : '로그인 중...'} disabled={isLoading} />
    </LoginForm>
  );
}
