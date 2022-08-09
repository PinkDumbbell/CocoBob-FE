import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/config';
import { selectIsLoggedIn } from '@/store/slices/authSlice';
import { useLoginMutation } from '@/store/api/userApi';
import { closeBottomSheetAction } from '@/store/slices/bottomSheetSlice';
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
import { ILoginForm } from './types';

const EmailLoginSheet = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [login] = useLoginMutation();

  const onSubmitCredentials = async (data: ILoginForm) => {
    await login(data);
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    dispatch(closeBottomSheetAction);
    navigate('/');
  }, [isLoggedIn]);

  return (
    <BottomSheet isOpen={isOpen}>
      <SheetContent>
        <FormWrapper>
          <h2>로그인</h2>
          <EmailLoginForm onSubmitCredentials={onSubmitCredentials} />
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
};

export default EmailLoginSheet;
