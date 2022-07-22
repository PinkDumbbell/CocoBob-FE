import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '@/store/slices/userSlice';
import { selectIsLoggedIn } from '@/store/slices/authSlice';

export default function useUser() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  console.log('login state', isLoggedIn);
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return { isLoggedIn, logout };
}
