import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage, FormContainer, FormInput, FormLabel } from './SignUpForm.style';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [emailChecked, setEmailChecked] = useState<string>('');
  const onClickSignUp = (data: any) => {
    if (!emailChecked || data.email !== emailChecked) {
      // 에러 메세지 출력
    }
  };
  const onClickDoubleCheck = (e: any) => {
    // todo : api요청 후 이메일 중복 테스트

    // 성공 했을 때
    setEmailChecked(e.target.value);
  };
  return (
    <FormContainer onSubmit={handleSubmit(onClickSignUp)}>
      <FormLabel htmlFor="email">이메일</FormLabel>
      <div>
        <FormInput type="text" id="email" {...register('email', { required: true })} />
        <button type="button" onClick={onClickDoubleCheck}>
          중복확인
        </button>
      </div>
      {errors.email && <ErrorMessage>이메일을 입력해주세요</ErrorMessage>}
      <FormLabel htmlFor="password">비밀번호</FormLabel>
      <FormInput type="password" id="password" {...register('password', { required: true })} />
      {errors.password && <ErrorMessage>비밀번호 입력해주세요</ErrorMessage>}
      <FormLabel htmlFor="password-confirm">비밀번호 확인</FormLabel>
      <FormInput
        type="password"
        id="password-confirm"
        {...register('passwordConfirm', { required: true })}
      />
      {errors.passwordConfirm && <ErrorMessage>비밀번호를 확인해주세요</ErrorMessage>}
      {watch('password') !== watch('passwordConfirm') && !errors.passwordConfirm && (
        <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
      )}
      <button onClick={onClickSignUp}>회원가입</button>
    </FormContainer>
  );
}
