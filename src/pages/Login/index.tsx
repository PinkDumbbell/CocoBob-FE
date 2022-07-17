import Button from '@/components/Button';
import { useState } from 'react';
import JoinLink from './components/JoinLink';
import SocialLoginForm from './components/SocialLoginForm';
import EmailLoginPage from './email';
import { PageContainer, LogoContainer, FormContainer, MockLogo } from './index.style';

export default function LoginPage() {
  const [bottomSheet, setBottomSheet] = useState('');

  const closeBottomSheet = () => setBottomSheet('');
  const openEmailLogin = () => setBottomSheet('email');
  // const openSignUp = () => setBottomSheet('signUp');

  return (
    <>
      <PageContainer>
        <LogoContainer>
          <MockLogo>로고</MockLogo>
        </LogoContainer>
        <FormContainer>
          <SocialLoginForm />
          <Button
            className="border-[1.5px] border-white"
            label="이메일로 로그인"
            backgroundColor="transparent"
            size="full"
            primary="first"
            onClick={openEmailLogin}
          />
          <JoinLink color="white" />
        </FormContainer>
      </PageContainer>
      <EmailLoginPage isOpen={bottomSheet === 'email'} close={closeBottomSheet} />
    </>
  );
}
