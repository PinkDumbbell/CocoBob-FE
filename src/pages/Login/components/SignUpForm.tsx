/* eslint-disable no-unused-vars */
import FormButton from '@/components/Form/FormButton';
import FormInput from '@/components/Form/FormInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import { concatClasses } from '@/utils/libs/concatClasses';
import { checkEmailDuplicated } from '../api';
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
  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const onClickSignUp = (data: SignUpFormInput) => {
    if (!emailChecked || data.email !== emailChecked) {
      // 에러 메세지 출력
    }
  };

  const checkEmail = async () => {
    const isAvailable = await checkEmailDuplicated(email);
    console.log('check : ', isAvailable);
    if (!isAvailable) {
      setEmailChecked('');
    }
    setEmailChecked(email);
  };

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
      />
      <div className="flex items-end w-full gap-2">
        <div className="w-10/12">
          <FormInput
            label="이메일"
            name="signup-email"
            required={true}
            type="text"
            placeholder="이메일을 입력하세요"
            onChange={debounce(() => checkEmail(), 300)}
            register={register('email', {
              required: true,
            })}
            isError={!!errors.email}
          />
        </div>
        <div className="w-2/12 h-12 flex justify-center">
          <div
            className={concatClasses(
              'h-full  w-10 flex justify-center items-center text-2xl',
              emailChecked && emailChecked === email ? 'text-green-400' : 'text-red-400',
            )}
          >
            V
          </div>
        </div>
      </div>
      <FormInput
        label="비밀번호"
        name="signup-password"
        required={true}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        register={register('password', { required: true })}
        isError={!!errors.password}
      />
      <FormInput
        label="비밀번호 확인"
        name="signup-passwordConfirm"
        required={true}
        type="password"
        placeholder="비밀번호를 확인해주세요"
        register={register('passwordConfirm', { required: true })}
        isError={password !== passwordConfirm || !!errors.passwordConfirm}
      />
      <FormButton name="회원가입" disabled={!email || !password || !passwordConfirm} />
    </FormContainer>
  );
}
