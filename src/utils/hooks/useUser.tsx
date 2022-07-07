import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/config';
import { loginAction, logoutAction } from '@/store/slices/userSlice';

export default function useUser() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const login = useCallback((data: any) => {
    dispatch(loginAction(data));
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return { isLoggedIn, login, logout };
}
