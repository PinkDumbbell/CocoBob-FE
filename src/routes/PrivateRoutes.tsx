import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import useUser from '@/utils/hooks/useUser';
import MainPage from '@/pages/Main';
import RegisterPet from '@/pages/RegisterPet';
import ProductsPage from '@/pages/Products';
import SearchPage from '@/pages/Search';

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
        <Route path="/register" element={<RegisterPet />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}
export default PrivateRoutes;
