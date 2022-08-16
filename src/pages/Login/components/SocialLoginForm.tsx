import { SocialLoginButton, FormWrapper } from './SocialLoginForm.style';
import AppleLoginButton from './AppleLoginButton';

export default function SocialLoginForm() {
  return (
    <FormWrapper>
      <SocialLoginButton>
        <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/google`}>Google로 로그인</a>
      </SocialLoginButton>
      <SocialLoginButton className="kakao">
        <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/kakao`}>카카오로 로그인</a>
      </SocialLoginButton>
      <AppleLoginButton />
      <SocialLoginButton className="apple">
        <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/apple`}>Apple로 로그인</a>
      </SocialLoginButton>
    </FormWrapper>
  );
}
