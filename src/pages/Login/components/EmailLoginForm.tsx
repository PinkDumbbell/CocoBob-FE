import FormInput from '@/components/FormInput';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/utils/api/userApi';
import { ILoginForm } from '../types';
import { LoginForm, LoginButton } from './EmailLoginForm.style';

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
    <LoginForm>
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
      <LoginButton
        onClick={handleSubmit(onSubmitLoginForm)}
        disabled={!watch('email') || !watch('password')}
      >
        로그인
      </LoginButton>
    </LoginForm>
  );
}
