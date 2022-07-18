import FormButton from '@/components/Form/FormButton';
import FormInput from '@/components/Form/FormInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from './SignUpForm.style';

interface SignUpFormInput {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormInput>();
  const [emailChecked, setEmailChecked] = useState<string>('');
  const onClickSignUp = (data: SignUpFormInput) => {
    if (!emailChecked || data.email !== emailChecked) {
      // 에러 메세지 출력
    }
  };
  // eslint-disable-next-line no-unused-vars
  const DoubleCheck = () => {
    // todo : api요청 후 이메일 중복 테스트

    // 성공 했을 때
    setEmailChecked('');
  };
  return (
    <FormContainer onSubmit={handleSubmit(onClickSignUp)}>
      <FormInput
        label="이름"
        name="username"
        required={true}
        type="text"
        placeholder="이름을 입력하세요"
        register={register('username', { required: true })}
        isError={!!errors.username}
      />
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
        placeholder="비밀번호를 입력해주세요"
        register={register('password', { required: true })}
        isError={!!errors.password}
      />
      <FormInput
        label="비밀번호 확인"
        name="passwordConfirm"
        required={true}
        type="password"
        placeholder="비밀번호를 확인해주세요"
        register={register('passwordConfirm', { required: true })}
        isError={watch('password') !== watch('passwordConfirm') || !!errors.passwordConfirm}
      />
      <FormButton
        name="회원가입"
        disabled={!watch('email') || !watch('password') || !watch('passwordConfirm')}
      />
    </FormContainer>
  );
}
