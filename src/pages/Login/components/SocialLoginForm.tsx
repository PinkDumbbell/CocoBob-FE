import { useAppSelector } from '@/store/config';
import { getPlatform } from '@/store/slices/platformSlice';
import { SocialLoginButton, FormWrapper } from './SocialLoginForm.style';
import AppleLoginButton from './AppleLoginButton';

export default function SocialLoginForm() {
  const platform = useAppSelector(getPlatform);

  return (
    <FormWrapper>
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
