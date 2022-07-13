import { SocialLoginButton, FormWrapper } from './SocialLoginForm.style';

export default function SocialLoginForm() {
  return (
    <FormWrapper>
      <SocialLoginButton>카카오로 로그인</SocialLoginButton>
      <SocialLoginButton>구글로 로그인</SocialLoginButton>
      <SocialLoginButton>애플로 로그인</SocialLoginButton>
    </FormWrapper>
  );
}
