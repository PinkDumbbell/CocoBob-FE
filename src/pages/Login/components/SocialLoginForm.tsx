import { SocialLoginButton, FormWrapper } from './SocialLoginForm.style';

export default function SocialLoginForm() {
  return (
    <FormWrapper>
      <SocialLoginButton>
        <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/google`}>구글 계정으로 로그인</a>
      </SocialLoginButton>
      <SocialLoginButton className="kakao">
        <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/kakao`}>카카오 계정으로 로그인</a>
      </SocialLoginButton>
      <SocialLoginButton className="apple">
        <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/apple`}>애플 계정으로 로그인</a>
      </SocialLoginButton>
    </FormWrapper>
  );
}
