import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/store/api/userApi';
import { useAppDispatch } from '@/store/config';
import { logout } from '@/store/slices/authSlice';
import useConfirm from '@/utils/hooks/useConfirm';

export default function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation, { isSuccess }] = useLogoutMutation();
  const [openPopup] = useConfirm();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      navigate('/login');
    }
  }, [isSuccess]);

  const onClickLogout = async () => {
    const confirm = await openPopup({
      title: '로그아웃',
      contents: '로그아웃을 하시겠습니까?',
    });
    if (confirm) {
      logoutMutation();
    }
  };
  return onClickLogout;
}
