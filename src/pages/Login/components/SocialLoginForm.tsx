import { SocialLoginButton, FormWrapper } from './SocialLoginForm.style';

export default function SocialLoginForm() {
  return (
    <FormWrapper>
      <SocialLoginButton>
        <a href="https://api.petalog.us/v1/users/google">구글 계정으로 로그인</a>
      </SocialLoginButton>
      <SocialLoginButton className="kakao">
        <a href="https://api.petalog.us/v1/users/kakao">카카오 계정으로 로그인</a>
      </SocialLoginButton>
      <SocialLoginButton className="apple">애플 계정으로 로그인</SocialLoginButton>
    </FormWrapper>
  );
}
