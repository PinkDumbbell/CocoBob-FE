import { useState } from 'react';
import { ErrorMessage, FormContainer, FormInput, FormLabel } from './SignUpForm.style';

type passwordType = {
  password: string;
  passwordConfirm: string;
};
type emailType = {
  email: string;
  emailChecked: string;
};
export default function SignUpForm() {
  const [emailCheck, setEmailCheck] = useState<emailType>({
    email: '',
    emailChecked: '',
  });
  const [passwordCheck, setPasswordCheck] = useState<passwordType>({
    password: '',
    passwordConfirm: '',
  });

  const onChangePassword = (e: any) => {
    setPasswordCheck((prevState: passwordType) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeEmail = (e: any) => {
    setEmailCheck({
      email: e.target.value,
      emailChecked: '',
    });
  };
  const onClickSignUp = (e: any) => {
    e.preventDefault();
    const { email, emailChecked } = emailCheck;
    if (!emailChecked || email !== emailChecked) {
      // 에러 메세지 출력
    }
  };
  const onClickDoubleCheck = (e: any) => {
    // todo : api요청 후 이메일 중복 테스트

    // 성공 했을 때
    setEmailCheck((prevState: emailType) => ({
      ...prevState,
      emailChecked: e.target.value,
    }));
  };
  return (
    <FormContainer onSubmit={onClickSignUp}>
      <FormLabel htmlFor="email">이메일</FormLabel>
      <div>
        <FormInput type="text" id="email" name="email" onChange={onChangeEmail} />
        <button type="button" onClick={onClickDoubleCheck}>
          중복확인
        </button>
      </div>
      <FormLabel htmlFor="password">비밀번호</FormLabel>
      <FormInput type="password" id="password" name="password" onChange={onChangePassword} />
      <FormLabel htmlFor="password-confirm">비밀번호 확인</FormLabel>
      <FormInput
        type="password"
        id="password-confirm"
        name="passwordConfirm"
        onChange={onChangePassword}
      />
      {passwordCheck.password !== passwordCheck.passwordConfirm && (
        <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
      )}
      <button onClick={onClickSignUp}>회원가입</button>
    </FormContainer>
  );
}
