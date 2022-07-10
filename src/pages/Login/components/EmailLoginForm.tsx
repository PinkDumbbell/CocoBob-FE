import { LoginForm, FormInput, LoginButton } from './EmailLoginForm.style';

export default function EmailLoginForm() {
  return (
    <LoginForm>
      <FormInput type="text" placeholder="이메일" />
      <FormInput type="text" placeholder="비밀번호" />
      <LoginButton>로그인</LoginButton>
    </LoginForm>
  );
}
