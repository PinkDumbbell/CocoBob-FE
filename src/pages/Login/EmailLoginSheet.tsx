import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/store/config';
import { selectIsLoggedIn } from '@/store/slices/authSlice';
import { useLoginMutation } from '@/store/api/userApi';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import useToastMessage from '@/utils/hooks/useToastMessage';
import EmailLoginForm from './components/EmailLoginForm';
import JoinLink from './components/JoinLink';
import { FormWrapper, SheetContent, SubmenuWrapper } from './index.style';
import { ILoginForm } from './types';

const EmailLoginSheet = ({
  isOpen,
  closeBottomSheet,
}: {
  isOpen: boolean;
  closeBottomSheet: () => void;
}) => {
  const navigate = useNavigate();
  const openToast = useToastMessage();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [login, { isLoading, isError, error, reset }] = useLoginMutation();

  const onSubmitCredentials = async (data: ILoginForm) => {
    await login(data);
  };

  useEffect(() => {
    return () => {
      closeBottomSheet();
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    closeBottomSheet();
    navigate('/', { replace: true });
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isError) return;
    const { status, data } = error as { status: number; data: { message?: string } };

    if (status === 403) {
      openToast('이메일 또는 비밀번호를 확인해주세요.');
    } else if (status === 404 && data?.message) {
      openToast(data.message);
    } else {
      openToast('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    reset();
  }, [isError]);

  return (
    <BottomSheet isOpen={isOpen}>
      <SheetContent>
        <FormWrapper>
          <h2>로그인</h2>
          <EmailLoginForm
            onSubmitCredentials={onSubmitCredentials}
            isLoading={isLoading}
            isError={isError}
          />
          <Link to="/find" className="text-caption text-primary">
            아이디/비밀번호 찾기
          </Link>
        </FormWrapper>
        <SubmenuWrapper>
          <JoinLink color="primary" />
        </SubmenuWrapper>
      </SheetContent>
    </BottomSheet>
  );
};

export default EmailLoginSheet;
