import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/config';
import { logoutAction } from '@/store/slices/userSlice';

export default function useUser() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return { isLoggedIn, logout };
}
