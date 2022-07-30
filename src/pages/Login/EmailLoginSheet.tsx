import { Link } from 'react-router-dom';

import BottomSheet from '@/components/BottomSheet';
import EmailLoginForm from './components/EmailLoginForm';
import JoinLink from './components/JoinLink';
import {
  FormWrapper,
  SheetContent,
  SocialLoginButton,
  SocialLoginButtonWrapper,
  SubmenuWrapper,
} from './index.style';

const EmailLoginSheet = ({ isOpen }: { isOpen: boolean }) => (
  <BottomSheet isOpen={isOpen}>
    <SheetContent>
      <FormWrapper>
        <h2>로그인</h2>
        <EmailLoginForm />
        <Link to="/find" className="font-normal text-primary-main">
          아이디/비밀번호 찾기
        </Link>
      </FormWrapper>
      <SubmenuWrapper>
        <SocialLoginButtonWrapper>
          <SocialLoginButton>K</SocialLoginButton>
          <SocialLoginButton>A</SocialLoginButton>
          <SocialLoginButton>G</SocialLoginButton>
        </SocialLoginButtonWrapper>
        <JoinLink color="primary" />
      </SubmenuWrapper>
    </SheetContent>
  </BottomSheet>
);

export default EmailLoginSheet;
