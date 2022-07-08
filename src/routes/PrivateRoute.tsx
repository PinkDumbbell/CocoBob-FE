import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import useUser from '@/utils/hooks/useUser';

function PrivateRoute({ children }: { children: ReactElement }) {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
