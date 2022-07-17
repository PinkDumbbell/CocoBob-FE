import FormInput from '@/components/Form/FormInput';
// eslint-disable-next-line import/no-unresolved
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/store/api/userApi';
import FormButton from '@/components/Form/FormButton';
import { ILoginForm } from '../types';
import { LoginForm } from './EmailLoginForm.style';

export default function EmailLoginForm() {
  const [login] = useLoginMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ILoginForm>();

  const onSubmitLoginForm = async (data: ILoginForm) => {
    console.log(data);
    await login(data);
  };

  return (
    <LoginForm onSubmit={handleSubmit(onSubmitLoginForm)}>
      <h2>로그인</h2>
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
      <FormButton name="로그인" disabled={!watch('email') || !watch('password')} />
    </LoginForm>
  );
}
