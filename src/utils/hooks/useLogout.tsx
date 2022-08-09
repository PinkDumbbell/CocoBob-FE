import { useLogoutMutation } from '@/store/api/userApi';
import { useAppDispatch } from '@/store/config';
import { logout } from '@/store/slices/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToastConfirm from './useToastConfirm';

export default function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutMutation, { isSuccess }] = useLogoutMutation();
  const logoutConfirm = useToastConfirm(() => logoutMutation());

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      navigate('/login');
    }
  }, [isSuccess]);

  const onClickLogout = () => {
    logoutConfirm('로그아웃을 하시겠습니까?');
  };
  return onClickLogout;
}
