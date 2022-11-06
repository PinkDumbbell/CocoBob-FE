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
      contents: <p className="py-10">로그아웃을 하시겠습니까?</p>,
    });
    if (confirm) {
      logoutMutation();
    }
  };
  return onClickLogout;
}
