import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/Button';
import { selectBottomSheet, setBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import JoinLink from './components/JoinLink';
import SocialLoginForm from './components/SocialLoginForm';
import EmailLoginSheet from './EmailLoginSheet';
import { PageContainer, LogoContainer, FormContainer, MockLogo } from './index.style';
import SignUpSheet from './SignUpSheet';

export default function LoginPage() {
  const bottomSheet = useSelector(selectBottomSheet);
  const dispatch = useDispatch();

  const openEmailLoginSheet = () => dispatch(setBottomSheetAction('emailLogin'));

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
          <JoinLink color="white" />
        </FormContainer>
      </PageContainer>
      <EmailLoginSheet isOpen={bottomSheet === 'emailLogin'} />
      <SignUpSheet isOpen={bottomSheet === 'signUp'} />
    </>
  );
}
