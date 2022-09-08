import usePlatform from '@/utils/hooks/usePlatform';
import { SocialLoginButton, FormWrapper } from './SocialLoginForm.style';
import AppleLoginButton from './AppleLoginButton';

export default function SocialLoginForm() {
  const platform = usePlatform();

  return (
    <FormWrapper className="space-y-[20px]">
      <SocialLoginButton>
        <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/google`}>Google로 로그인</a>
      </SocialLoginButton>
      <SocialLoginButton className="kakao">
        <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/kakao`}>카카오로 로그인</a>
      </SocialLoginButton>
      {platform !== 'android' && <AppleLoginButton />}
    </FormWrapper>
  );
}
