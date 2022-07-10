import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import useUser from '@/utils/hooks/useUser';
import MainPage from '@/pages/Main';

function PrivateRoute({ children }: { children: ReactElement }) {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

function WithPageGuard(WrappedComponent: React.ComponentType) {
  return (
    <PrivateRoute>
      <WrappedComponent />
    </PrivateRoute>
  );
}
function PrivateRoutes() {
  return (
    <Routes>
      <Route element={WithPageGuard(MainPage)} path={'/'} />
    </Routes>
  );
}
export default PrivateRoutes;
