import { useLogoutMutation } from '@/store/api/userApi';
import { useAppDispatch } from '@/store/config';
import { logout } from '@/store/slices/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation, { isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      navigate('/login');
    }
  }, [isSuccess]);

  const onClickLogout = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('로그아웃을 하시겠습니까?')) {
      logoutMutation();
    }
  };
  return onClickLogout;
}
