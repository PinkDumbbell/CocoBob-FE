import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import useUser from '@/utils/hooks/useUser';
import MainPage from '@/pages/Main';
// import RegisterPet from '@/pages/RegisterPet';

function PrivateRoute() {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

function PrivateRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/register" element={<RegisterPet />} /> */}
      </Route>
    </Routes>
  );
}
export default PrivateRoutes;
