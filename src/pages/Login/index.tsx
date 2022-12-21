import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { closeBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import { useAppDispatch } from '@/store/config';
import PetalogMain from '@/assets/image/petalog_main.png';
import OnBoardingScreen from '@/pages/OnBoarding';

import JoinLink from './components/JoinLink';
import SocialLoginForm from './components/SocialLoginForm';
import { PageContainer, LogoContainer, FormContainer } from './index.style';
import EmailLoginSheet from './EmailLoginSheet';
import SignUpSheet from './SignUpSheet';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [isOnboardingShown, setOnboardingShown] = useState(true);

  const agreement = searchParams.get('agreement');
  const privacyModal = agreement === 'privacy';

  const { isBottomSheetOpen: isEmailBottomSheetOpen, openBottomSheet: openEmailLoginSheet } =
    useBottomSheet('emailLogin');
  const { isBottomSheetOpen: isSignUpBottomSheetOpen, openBottomSheet: openSignUpBottomSheet } =
    useBottomSheet('signUp');

  const closeBottomSheet = () => {
    dispatch(closeBottomSheetAction());
  };
  useEffect(
    () => () => {
      closeBottomSheet();
    },
    [],
  );
  useEffect(() => {
    if (!privacyModal) {
      return;
    }
    openSignUpBottomSheet();
  }, [privacyModal]);
  return (
    <>
      {isOnboardingShown && <OnBoardingScreen closeOnBoardingScreen={setOnboardingShown} />}
      <PageContainer>
        <LogoContainer>
          <img src={PetalogMain} alt="petalog_main_image" className="max-w-[425px] w-60" />
        </LogoContainer>
        <FormContainer>
          <SocialLoginForm />
          <Button
            className="border-[1.5px] border-secondary-brightest text-p h-btn"
            label="이메일로 로그인"
            backgroundColor="transparent"
            width="full"
            primary="first"
            onClick={openEmailLoginSheet}
          />
          <JoinLink color="white" />
        </FormContainer>
      </PageContainer>
      <EmailLoginSheet isOpen={isEmailBottomSheetOpen} closeBottomSheet={closeBottomSheet} />
      <SignUpSheet isOpen={isSignUpBottomSheetOpen} />
    </>
  );
}
