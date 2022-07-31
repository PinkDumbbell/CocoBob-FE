import { SocialLoginButton, FormWrapper } from './SocialLoginForm.style';

export default function SocialLoginForm() {
  return (
    <FormWrapper>
      <SocialLoginButton>구글 계정으로 로그인</SocialLoginButton>
      <SocialLoginButton className="kakao">카카오 계정으로 로그인</SocialLoginButton>
      <SocialLoginButton className="apple">애플 계정으로 로그인</SocialLoginButton>
    </FormWrapper>
  );
}
