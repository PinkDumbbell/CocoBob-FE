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

  const onClickLogout = () => logoutMutation();
  return onClickLogout;
}
