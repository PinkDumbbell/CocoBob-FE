import Button from '@/components/Button';
import { useState } from 'react';
import JoinLink from './components/JoinLink';
import SocialLoginForm from './components/SocialLoginForm';
import EmailLoginSheet from './EmailLoginSheet';
import { PageContainer, LogoContainer, FormContainer, MockLogo } from './index.style';
import SignUpSheet from './SignUpSheet';

export default function LoginPage() {
  const [bottomSheet, setBottomSheet] = useState('');

  const closeBottomSheet = () => setBottomSheet('');
  const openEmailLoginSheet = () => setBottomSheet('email');
  const openSignUpSheet = () => setBottomSheet('signUp');

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
            onClick={openEmailLoginSheet}
          />
          <JoinLink color="white" openSignUpSheet={openSignUpSheet} />
        </FormContainer>
      </PageContainer>
      <EmailLoginSheet
        isOpen={bottomSheet === 'email'}
        close={closeBottomSheet}
        openSignUpSheet={openSignUpSheet}
      />
      <SignUpSheet
        isOpen={bottomSheet === 'signUp'}
        close={closeBottomSheet}
        openEmailLoginSheet={openEmailLoginSheet}
      />
    </>
  );
}
