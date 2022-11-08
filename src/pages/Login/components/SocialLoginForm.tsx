import { useAppSelector } from '@/store/config';
import googleLogo from '@/assets/icon/google_logo.png';
import kakaoLogo from '@/assets/icon/kakao_logo.png';
import { getCurrentPlatform } from '@/store/slices/platformSlice';
import { SocialLoginButton, FormWrapper } from './SocialLoginForm.style';
import AppleLoginButton from './AppleLoginButton';

export default function SocialLoginForm() {
  const platform = useAppSelector(getCurrentPlatform);

  return (
    <FormWrapper className="space-y-[20px]">
      <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/google`} className="w-full">
        <SocialLoginButton id="btn-google-login">
          <img src={googleLogo} alt="구글 로고" className="h-5 mr-1" />
          <span>Google 로그인</span>
        </SocialLoginButton>
      </a>
      <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/users/kakao`} className="w-full">
        <SocialLoginButton id="btn-kakao-login">
          <img src={kakaoLogo} alt="카카오 로고" className="h-7" />
          <span className="px-2">카카오 로그인</span>
        </SocialLoginButton>
      </a>
      {platform !== 'android' && <AppleLoginButton />}
    </FormWrapper>
  );
}
