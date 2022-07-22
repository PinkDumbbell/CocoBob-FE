import React, { ReactElement } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import useUser from '@/utils/hooks/useUser';
import MainPage from '@/pages/Main';
import RegisterPet from '@/pages/RegisterPet';

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
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route element={WithPageGuard(MainPage)} path={'/'} />
      <Route element={WithPageGuard(RegisterPet)} path={'/register'} />
    </Routes>
  );
}
export default PrivateRoutes;
