import Button from '@/components/Button';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import { closeBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/config';
import PetalogMain from '@/assets/image/petalog_main.png';
import JoinLink from './components/JoinLink';
import SocialLoginForm from './components/SocialLoginForm';
import { PageContainer, LogoContainer, FormContainer } from './index.style';
import EmailLoginSheet from './EmailLoginSheet';
import SignUpSheet from './SignUpSheet';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { isBottomSheetOpen: isEmailBottomSheetOpen, openBottomSheet: openEmailLoginSheet } =
    useBottomSheet('emailLogin');
  const { isBottomSheetOpen: isSignUpBottomSheetOpen } = useBottomSheet('signUp');

  useEffect(
    () => () => {
      dispatch(closeBottomSheetAction());
    },
    [],
  );
  return (
    <>
      <PageContainer>
        <LogoContainer>
          <img src={PetalogMain} alt="petalog_main_image" className="max-w-[425px] w-60" />
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
          <JoinLink color="white" />
        </FormContainer>
      </PageContainer>
      <EmailLoginSheet isOpen={isEmailBottomSheetOpen} />
      <SignUpSheet isOpen={isSignUpBottomSheetOpen} />
    </>
  );
}
