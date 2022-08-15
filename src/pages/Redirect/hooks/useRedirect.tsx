import { ReactNode, useEffect, useState } from 'react';
import axios from '@/utils/api';
import { IAuthenticatedUser } from '@/@type/user';
import { IGenericResponse } from '@/store/api/types';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/store/config';
import { setCredentials } from '@/store/slices/authSlice';
import Layout from '@/components/layout/Layout';

export default function useRedirect(
  children: ReactNode,
  socialLoginType: 'kakao' | 'google' | 'apple',
) {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function redirect() {
      const code = searchParams.get('code');
      const user = searchParams.get('user');
      console.log(searchParams);
      console.log(searchParams.getAll);
      console.log(code);
      console.log(user);
      const {
        data: { data },
      } = await axios.get<IGenericResponse<IAuthenticatedUser>>(
        `/users/login/oauth/${socialLoginType}?code=${code}${user ? `&user=${user}` : ''}`,
      );
      if (data.userId) {
        dispatch(setCredentials(data));
        setIsLoading(false);
      }
    }
    redirect();
  }, []);

  return isLoading ? <Layout>{children}</Layout> : <Navigate to="/" replace />;
}
