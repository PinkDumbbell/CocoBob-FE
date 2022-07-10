import { SocialLoginButton, FormWrapper } from './SocialLoginForm.style';

export default function SocialLoginForm() {
  return (
    <div>
      <FormWrapper>
        <SocialLoginButton>카카오</SocialLoginButton>
        <SocialLoginButton>구글</SocialLoginButton>
        <SocialLoginButton>애플</SocialLoginButton>
      </FormWrapper>
    </div>
  );
}
